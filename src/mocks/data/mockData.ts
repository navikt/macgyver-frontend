import { Oppgave, Journalpost, Person } from './types'

export const oppgaverList: Oppgave[] = [
    {
        id: 362848301,
        versjon: 1,
        tildeltEnhetsnr: '0101',
        opprettetAvEnhetsnr: '9999',
        aktoerId: '2779114099843',
        journalpostId: '620048552',
        behandlesAvApplikasjon: 'FS22',
        saksreferanse: null,
        tilordnetRessurs: null,
        beskrivelse:
            'Manuell behandling av sykmelding grunnet følgende regler: Infotrygd returnerte en feil, vi kan ikke automatisk oppdatere Infotrygd',
        tema: 'SYM',
        oppgavetype: 'BEH_EL_SYM',
        behandlingstype: null,
        aktivDato: '2023-09-11',
        fristFerdigstillelse: '2023-09-15',
        prioritet: 'NORM',
        status: 'OPPRETTET',
        mappeId: null,
    },
    {
        id: 362851981,
        versjon: 1,
        tildeltEnhetsnr: '0231',
        opprettetAvEnhetsnr: '9999',
        aktoerId: '2843217343728',
        journalpostId: '620048839',
        behandlesAvApplikasjon: 'FS22',
        saksreferanse: null,
        tilordnetRessurs: null,
        beskrivelse: 'Manuell behandling av sykmelding grunnet følgende regler: Pasienten finnes ikke i Infotrygd',
        tema: 'SYM',
        oppgavetype: 'BEH_EL_SYM',
        behandlingstype: null,
        aktivDato: '2023-09-12',
        fristFerdigstillelse: '2023-09-18',
        prioritet: 'NORM',
        status: 'OPPRETTET',
        mappeId: null,
    },
]

export const journalposterList: { fnr: string; journalposter: Journalpost[] }[] = [
    {
        fnr: '6107783512',
        journalposter: [
            { journalpostId: '620045526', tittel: 'Sykmelding 24.08.2023 - 30.08.2023' },
            { journalpostId: '620044945', tittel: 'Sykmelding 18.08.2023 - 24.08.2023' },
            { journalpostId: '620044929', tittel: 'Sykmelding 18.08.2023 - 24.08.2023' },
            { journalpostId: '620044652', tittel: 'Utenlandsk papirsykmelding 24.08.2023 - 25.08.2023' },
        ],
    },
    {
        fnr: '8903554918',
        journalposter: [
            { journalpostId: '620044499', tittel: 'Sykmelding 16.08.2023 - 22.08.2023' },
            { journalpostId: '620044498', tittel: 'Sykmelding 16.08.2023 - 22.08.2023' },
            { journalpostId: '620044361', tittel: 'Sykmelding 15.08.2023 - 21.08.2023' },
            { journalpostId: '620044325', tittel: 'Sykmelding 15.08.2023 - 21.08.2023' },
            { journalpostId: '620044324', tittel: 'Sykmelding 15.08.2023 - 21.08.2023' },
        ],
    },
    {
        fnr: '88235490122',
        journalposter: [
            { journalpostId: '620043349', tittel: 'Sykmelding 09.08.2023 - 15.08.2023' },
            { journalpostId: '620043347', tittel: 'Sykmelding 09.08.2023 - 15.08.2023' },
        ],
    },
]

export const personer: Person[] = [
    {
        identer: [
            { ident: '2079210931587', historisk: false, gruppe: 'AKTORID' },
            { ident: '49828801413', historisk: false, gruppe: 'FOLKEREGISTERIDENT' },
        ],
        navn: 'Praktisk Ferskvann',
        fnr: '49828801413',
    },
    {
        identer: [{ ident: '59459318543', historisk: false, gruppe: 'FOLKEREGISTERIDENT' }],
        navn: 'Spretten Frosk',
        fnr: '59459318543',
    },
]
