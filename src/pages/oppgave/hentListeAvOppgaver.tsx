'use client'

import { Alert, BodyShort, Loader } from '@navikt/ds-react'
import { ReactElement, useState, useTransition } from 'react'

import { withAuthenticatedPage } from '../../auth/withAuth'
import OppgaveIdForm from '../../components/OppgaveIdForm/OppgaveIdForm'
import Innhold from '../../components/Innhold/Innhold'
import { Oppgave, OppgaverField } from '../../types/oppgaver'
import { hentListeMedOppgaver } from '../../actions/server-actions'

const HentListeAvOppgaver = (): ReactElement => {
    const [data, setData] = useState<Oppgave | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleClick = (oppgaveider: OppgaverField): void => {
        startTransition(async (): Promise<void> => {
            try {
                const response: Oppgave = await hentListeMedOppgaver(oppgaveider)
                setData(response)
                setError(null)
            } catch (e) {
                setData(null)
                setError(`Henting av oppgaver feilet. ${e}`)
            }
        })
    }

    return (
        <Innhold>
            <BodyShort>Hent en liste av oppgaver med oppgaveId fra Oppgave-api: eks: 2,3,4,5</BodyShort>
            <OppgaveIdForm
                onChange={(oppgaveIder: number[]): void => {
                    handleClick(oppgaveIder)
                }}
            />
            {!data && !error && isPending && <Loader size="medium" />}
            {data && <Alert variant="success">{JSON.stringify(data, null, 2)}</Alert>}
            {error && <Alert variant="error">{error}</Alert>}
        </Innhold>
    )
}
export const getServerSideProps = withAuthenticatedPage()

export default HentListeAvOppgaver
