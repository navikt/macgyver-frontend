'use server'

import { logger } from '@navikt/next-logger'

import { IdentEndringSykmeldt } from '../types/identEndring'
import { NyNLAltinn } from '../types/nyNLAltinn'
import { Oppgave } from '../types/oppgaver'
import { Person } from '../types/person'
import {
    getJournalposterMock,
    getListeMedNarmesteLedereMock,
    getListeMedOppgaverMock,
    getPersonMock,
} from '../mocks/mockData'
import { authorizationFetch } from '../auth/withAuth'
import { Jouranlpost } from '../types/jouranlpost'
import { FinnNarmesteldere } from '../types/finnNarmesteldere'
import { Narmesteldere } from '../types/narmesteldere'

export async function identEndringSykmeldt(fnr: string, nyttFnr: string): Promise<void> {
    if (process.env.NODE_ENV !== 'production') return

    const identEndringData: IdentEndringSykmeldt = {
        fnr,
        nyttFnr,
    }
    const response: Response = await authorizationFetch('sykmelding/fnr', 'POST', {}, JSON.stringify(identEndringData))

    if (!response.ok) {
        throw new Error(`Noe gikk galt ved ved endring av fnr: ${response.status} ${response.statusText}`)
    } else {
        logger.info(`Endring av fnr er fullført.`)
    }
}

export async function slettSykmelding(sykmeldingId: string, journalpostId: string): Promise<void> {
    if (process.env.NODE_ENV !== 'production') return

    const response: Response = await authorizationFetch(`sykmelding/${sykmeldingId}/${journalpostId}`, 'DELETE')

    if (!response.ok) {
        throw new Error(`Noe gikk galt ved sletting av sykmelding: ${response.status} ${response.statusText}`)
    } else {
        logger.info(`Sykmelding er slettet.`)
    }
}

export async function nlRequestAltinn(sykmeldingId: string, fnr: string, orgnummer: string): Promise<void> {
    if (process.env.NODE_ENV !== 'production') return

    const nyNLRequestData: NyNLAltinn = {
        sykmeldingId,
        fnr,
        orgnummer,
    }

    const response: Response = await authorizationFetch(
        'narmesteleder/request',
        'POST',
        {},
        JSON.stringify(nyNLRequestData),
    )

    if (!response.ok) {
        throw new Error(
            `Noe gikk galt ved sending av ny NL-request til Altinn: ${response.status} ${response.statusText}`,
        )
    } else {
        logger.info(`Ny NL-request er sendt til altinn.`)
    }
}

export async function narmesteldereRequest(sykmeldtFnr: string): Promise<Narmesteldere[]> {
    if (process.env.NODE_ENV !== 'production') {
        return getListeMedNarmesteLedereMock()
    }

    const finnNarmesteldereRequestData: FinnNarmesteldere = {
        sykmeldtFnr,
    }

    const response: Response = await authorizationFetch(
        'narmesteleder',
        'GET',
        {},
        JSON.stringify(finnNarmesteldereRequestData),
    )

    if (!response.ok) {
        throw new Error(`Noe gikk galt ved hentering av narmesteledere: ${response.status} ${response.statusText}`)
    } else {
        return await response.json()
    }
}

export async function hentListeMedOppgaver(oppgaveider: number[]): Promise<Oppgave[]> {
    if (process.env.NODE_ENV !== 'production') {
        const oppgaver: Oppgave[] | [] = getListeMedOppgaverMock(oppgaveider)

        if (oppgaver && oppgaver.length) return oppgaver
        throw new Error('Finner ikke oppgaver.')
    }

    const response: Response = await authorizationFetch('oppgave/list', 'POST', {}, JSON.stringify(oppgaveider))

    if (!response.ok) {
        throw new Error(`Noe gikk galt ved henting av liste med oppgaver: ${response.status} ${response.statusText}`)
    } else {
        return await response.json()
    }
}

export async function slettLegeerklaring(legeerklaeringId: string): Promise<void> {
    if (process.env.NODE_ENV !== 'production') return

    const response: Response = await authorizationFetch(`legeerklaering/${legeerklaeringId}`, 'DELETE')

    if (!response.ok) {
        throw new Error(`Noe gikk galt ved sletting av legeerklaering: ${response.status} ${response.statusText}`)
    } else {
        logger.info(`Legeerklæring er slettet.`)
    }
}

export async function hentListeMedJournalposter(fnr: string): Promise<Jouranlpost[]> {
    if (process.env.NODE_ENV !== 'production') {
        const journalposter: Jouranlpost[] | undefined = getJournalposterMock(fnr)

        if (journalposter) return journalposter
        throw new Error('Finner ikke journalposter.')
    }

    const response: Response = await authorizationFetch(`journalposter/${fnr}`, 'GET')

    if (!response.ok) {
        throw new Error(`Noe gikk galt ved henting av journalposter: ${response.status} ${response.statusText}`)
    } else {
        return await response.json()
    }
}

export async function hentPerson(fnr: string): Promise<Person> {
    if (process.env.NODE_ENV !== 'production') {
        const person: Person | undefined = getPersonMock(fnr)

        if (person) return person
        throw new Error('Finner ikke person.')
    }

    const response: Response = await authorizationFetch('person', 'GET', {
        fnr: fnr,
    })

    if (!response.ok) {
        throw new Error(`Noe gikk galt ved henting av person: ${response.status} ${response.statusText}`)
    } else {
        return await response.json()
    }
}

export async function runRegulusDumpulus(year: number | null): Promise<boolean> {
    const response: Response = await authorizationFetch(`smregister/job?year=${year ?? null}`, 'POST')

    if (!response.ok) {
        logger.error(`Noe gikk galt ved starting av dumpejobb: ${response.status} ${response.statusText}`)
        return false
    } else {
        const body = await response.json()
        logger.info(`Dumpejobb startet: ${JSON.stringify(body)}`)
        return true
    }
}
