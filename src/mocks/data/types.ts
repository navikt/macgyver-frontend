export type Oppgave = {
    oppgavetype: string
    mappeId?: number | null
    prioritet: string
    opprettetAvEnhetsnr?: string | null
    fristFerdigstillelse?: string | null
    aktivDato: string
    aktoerId?: string | null
    versjon?: number | null
    tildeltEnhetsnr?: string | null
    saksreferanse?: string | null
    behandlingstype?: string | null
    tilordnetRessurs?: string | null
    tema?: string | null
    behandlesAvApplikasjon?: string
    id?: number | null
    beskrivelse?: string | null
    journalpostId?: string | null
    status?: string | null
}

export type Journalpost = { tittel: string; journalpostId: string }

export type Person = {
    identer: Array<{ historisk: boolean; ident: string; gruppe: string }>
    navn?: string | null
    fnr: string
}
