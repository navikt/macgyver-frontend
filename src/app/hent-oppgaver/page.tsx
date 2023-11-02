'use client'

import { Alert, BodyShort, Loader } from '@navikt/ds-react'
import { ReactElement, useState, useTransition } from 'react'

import OppgaveIdForm from '../../components/OppgaveIdForm/OppgaveIdForm'
import Innhold from '../../components/Innhold/Innhold'
import { Oppgave, OppgaverField } from '../../types/oppgaver'
import { hentListeMedOppgaver } from '../../actions/server-actions'
import OppgaveList from '../../components/OppgaveIdForm/OppgaveList'

function Page(): ReactElement {
    const [data, setData] = useState<Oppgave[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleClick = (oppgaveider: OppgaverField): void => {
        startTransition(async (): Promise<void> => {
            if (!oppgaveider || !oppgaveider.length) {
                setData(null)
                setError('Mangler oppgaveider.')
                return
            }

            try {
                const response: Oppgave[] = await hentListeMedOppgaver(oppgaveider)
                setData(response)
                setError(null)
            } catch (e) {
                setData(null)
                setError('Henting av oppgaver feilet.')
            }
        })
    }

    return (
        <Innhold>
            <BodyShort>Hent en liste med oppgaver med oppgaveId fra Oppgave-api: eks: 2, 3, 4, 5</BodyShort>
            <OppgaveIdForm
                onChange={(oppgaveIder: number[]): void => {
                    handleClick(oppgaveIder)
                }}
            />
            {!data && !error && isPending && <Loader size="medium" />}
            {data && (
                <div className="flex flex-wrap gap-6">
                    {data.map((oppgave: Oppgave) => (
                        <OppgaveList key={oppgave.id} oppgave={oppgave} />
                    ))}
                </div>
            )}
            {error && <Alert variant="error">{error}</Alert>}
        </Innhold>
    )
}

export default Page
