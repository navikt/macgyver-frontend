'use client'

import { logger } from '@navikt/next-logger'

import { IdentEndringSykmeldt } from '../types/identEndring'
import { NyNLAltinn } from '../types/nyNLAltinn'
import { Oppgave } from '../types/oppgaver'
import { Jouranlpost } from '../types/jouranlpost'
import { Person } from '../types/person'

export async function identEndringSykmeldt(fnr: string, nyttFnr: string): Promise<void> {
    if (!fnr || !nyttFnr) throw new Error('fnr eller nyttFnr mangler.')

    const SYKMELDING_FNR_URL = `/api/proxy/api/sykmelding/fnr`
    const identEndringData: IdentEndringSykmeldt = {
        fnr,
        nyttFnr,
    }

    const response: Response = await fetch(`${SYKMELDING_FNR_URL}`, {
        method: 'POST',
        body: JSON.stringify(identEndringData),
        headers: { 'Content-Type': 'application/json' },
    })

    logger.info(`IdentEndringSykmeldt response status is: ${response.status} and statusText ${response.statusText}`)

    if (!response.ok) {
        throw new Error(`${response.statusText} Httpstatus code is ${response.status}`)
    }
    logger.info(`Endring av fnr er fullført.`)
}

export async function slettSykmelding(sykmeldingId: string): Promise<void> {
    if (!sykmeldingId) throw new Error('sykmeldingId mangler.')

    const SYKMELDING_URL = `/api/proxy/api/sykmelding`
    const response: Response = await fetch(`${SYKMELDING_URL}/${sykmeldingId}`, {
        method: 'DELETE',
    })

    logger.info(`SlettSykmelding response status is: ${response.status} and statusText ${response.statusText}`)

    if (!response.ok) {
        throw new Error(`${response.statusText} Httpstatus code is ${response.status}`)
    }
    logger.info(`Sykmelding er slettet.`)
}

export async function nlRequestAltinn(sykmeldingId: string, fnr: string, orgnummer: string): Promise<void> {
    if (!sykmeldingId || !fnr || !orgnummer) throw new Error('sykmeldingId, fnr eller orgnummer mangler.')

    const NARMESTELEDER_URL = `/api/proxy/api/narmesteleder/request`
    const nyNLRequestData: NyNLAltinn = {
        sykmeldingId,
        fnr,
        orgnummer,
    }

    const response: Response = await fetch(`${NARMESTELEDER_URL}`, {
        method: 'POST',
        body: JSON.stringify(nyNLRequestData),
        headers: { 'Content-Type': 'application/json' },
    })

    logger.info(`NyNLRequestAltinn response status is: ${response.status} and statusText ${response.statusText}`)

    if (!response.ok) {
        throw new Error(`${response.statusText} Httpstatus code is ${response.status}`)
    }
    logger.info(`Ny NL-request er sendt til altinn.`)
}

export async function hentListeMedOppgaver(oppgaveider: number[]): Promise<Oppgave> {
    if (!oppgaveider || !oppgaveider.length) throw new Error('oppgaveider mangler.')

    const HENT_LISTE_AV_OPPGAVER_URL = `/api/proxy/api/oppgave/list`
    const response: Response = await fetch(HENT_LISTE_AV_OPPGAVER_URL, {
        method: 'POST',
        body: JSON.stringify(oppgaveider),
        headers: { 'Content-Type': 'application/json' },
    })

    logger.info(`HentListeAvOppgaver response status is: ${response.status} and statusText ${response.statusText}`)

    if (!response.ok) {
        throw new Error(`${response.statusText} Httpstatus code is ${response.status}`)
    }
    return await response.json()
}

export async function slettLegeerklaring(legeerklaeringId: string): Promise<void> {
    if (!legeerklaeringId) throw new Error('legeerklaeringId mangler.')

    const LEGEERKLARING_URL = `/api/proxy/api/legeerklaering`
    const response: Response = await fetch(`${LEGEERKLARING_URL}/${legeerklaeringId}`, {
        method: 'DELETE',
    })

    logger.info(`SlettLegeerklaring response status is: ${response.status} and statusText ${response.statusText}`)

    if (!response.ok) {
        throw new Error(`${response.statusText} Httpstatus code is ${response.status}`)
    }
    logger.info(`Legeerklæring er slettet.`)
}

export async function hentListeMedJournalposter(fnr: string): Promise<Jouranlpost> {
    if (!fnr) throw new Error('fnr mangler.')

    const HENT_LISTE_AV_JOURNALPOSTER_URL = `/api/proxy/api/journalposter`
    const response: Response = await fetch(HENT_LISTE_AV_JOURNALPOSTER_URL + `/${fnr}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    logger.info(`HentListeAvJournalposter response status is: ${response.status} and statusText ${response.statusText}`)

    if (!response.ok) {
        throw new Error(`${response.statusText} Httpstatus code is ${response.status}`)
    }
    return await response.json()
}

export async function hentPerson(fnr: string): Promise<Person> {
    if (!fnr) throw new Error('fnr mangler.')

    const HENT_PERSON = `/api/proxy/api/person`
    const response: Response = await fetch(HENT_PERSON, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            fnr: fnr,
        },
    })

    logger.info(`HentPerson response status is: ${response.status} and statusText ${response.statusText}`)

    if (!response.ok) {
        throw new Error(`${response.statusText} Httpstatus code is ${response.status}`)
    }
    return await response.json()
}
