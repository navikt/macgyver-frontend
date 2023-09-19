import { rest, RestHandler } from 'msw'

import { IdentEndringSykmeldt } from '../types/identEndring'
import { OppgaverField, Oppgave } from '../types/oppgaver'
import { NyNLAltinn } from '../types/nyNLAltinn'
import { Jouranlpost } from '../types/jouranlpost'
import { Person } from '../types/person'

import { journalposterList, oppgaverList, personer } from './data/mockData'

export const handlers: RestHandler[] = [
    rest.post('/api/proxy/api/sykmelding/fnr', async (req, res, ctx) => {
        const fnr: IdentEndringSykmeldt = await req.json()

        if (fnr.fnr !== '' && fnr.nyttFnr !== '') {
            return res(ctx.json({ message: 'Fnr has been changed.' }))
        } else {
            return res(ctx.status(400))
        }
    }),
    rest.delete('/api/proxy/api/sykmelding', async (req, res, ctx) => {
        const sykmeldingId = req.params.sykmeldingId

        if (sykmeldingId) {
            return res(ctx.json({ message: 'Sykmelding has been deleted.' }))
        } else {
            return res(ctx.status(400))
        }
    }),
    rest.post('/api/proxy/api/oppgave/list', async (req, res, ctx) => {
        const oppgaveider: OppgaverField = await req.json()

        const oppgaver: (Oppgave | undefined)[] = oppgaveider
            .map((id: number) => {
                return oppgaverList.find((oppgave: Oppgave): boolean => oppgave.id === id)
            })
            .filter((oppg: Oppgave | undefined): boolean => {
                return oppg !== undefined
            })

        if (oppgaver && oppgaver.length) {
            return res(ctx.json(oppgaver))
        } else {
            return res(ctx.status(400, 'Oppgave is missing.'))
        }
    }),
    rest.post('/api/proxy/api/narmesteleder/request', async (req, res, ctx) => {
        const values: NyNLAltinn = await req.json()

        if (values.sykmeldingId !== '' && values.fnr !== '' && values.orgnummer !== '') {
            return res(ctx.json({ message: 'Request has been sent.' }))
        } else {
            return res(ctx.status(400))
        }
    }),
    rest.delete('/api/proxy/api/legeerklaering', (req, res, ctx) => {
        const legeerklaeringId = req.params.legeerklaeringId

        if (legeerklaeringId) {
            return res(ctx.json({ message: 'Legeerklæring has been deleted.' }))
        } else {
            return res(ctx.status(400))
        }
    }),
    rest.get('/api/proxy/api/journalposter/:fnr', (req, res, ctx) => {
        const fnr = req.params.fnr

        const journalposter: Jouranlpost[] | undefined = journalposterList.find((person): boolean => {
            return person.fnr === fnr
        })?.journalposter

        if (journalposter) {
            return res(ctx.json(journalposter))
        } else {
            return res(ctx.status(400))
        }
    }),
    rest.get('/api/proxy/api/person', async (req, res, ctx) => {
        const fnr: string | null = req.headers.get('fnr')

        const person: Person | undefined = personer.find((pers: Person): boolean => {
            return pers.fnr === fnr
        })

        if (person) {
            return res(ctx.json({ person }))
        } else {
            return res(ctx.status(400))
        }
    }),
]
