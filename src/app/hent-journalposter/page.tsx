'use client'

import { Alert, BodyShort, Loader } from '@navikt/ds-react'
import { ReactElement, useState, useTransition } from 'react'

import Innhold from '../../components/Innhold/Innhold'
import FnrForm from '../../components/FnrForm/FnrForm'
import { hentListeMedJournalposter } from '../../actions/server-actions'
import { Jouranlpost } from '../../types/jouranlpost'
import JournalpostList from '../../components/FnrForm/JournalpostList'

function HentListeAvJournalposter(): ReactElement {
    const [data, setData] = useState<Jouranlpost[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleClick = (fnr: string): void => {
        startTransition(async (): Promise<void> => {
            if (!fnr) {
                setData(null)
                setError('Mangler fnr.')
                return
            }

            try {
                const response: Jouranlpost[] = await hentListeMedJournalposter(fnr)
                setData(response)
                setError(null)
            } catch (e) {
                setData(null)
                setError('Henting av journalposter feilet.')
            }
        })
    }

    return (
        <Innhold>
            <BodyShort>Hent en liste med journalposter, med oppgaveId fra saf-api</BodyShort>
            <FnrForm
                onChange={(fnr: string): void => {
                    handleClick(fnr)
                }}
            />
            {!data && !error && isPending && <Loader size="medium" />}
            {data && <JournalpostList journalpostLister={data} />}
            {error && <Alert variant="error">{error}</Alert>}
        </Innhold>
    )
}

export default HentListeAvJournalposter
