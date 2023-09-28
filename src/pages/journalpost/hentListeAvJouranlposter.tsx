'use client'

import { Alert, BodyShort, Loader } from '@navikt/ds-react'
import { ReactElement, useState, useTransition } from 'react'

import { withAuthenticatedPage } from '../../auth/withAuth'
import Innhold from '../../components/Innhold/Innhold'
import FnrForm from '../../components/FnrForm/FnrForm'
import { hentListeMedJournalposter } from '../../actions/server-actions'
import { Jouranlpost } from '../../types/jouranlpost'

const HentListeAvJournalposter = (): ReactElement => {
    const [data, setData] = useState<Jouranlpost | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleClick = (fnr: string): void => {
        startTransition(async (): Promise<void> => {
            try {
                const response: Jouranlpost = await hentListeMedJournalposter(fnr)
                setData(response)
                setError(null)
            } catch (e) {
                setData(null)
                setError(`Henting av journalposter feilet. ${e}`)
            }
        })
    }

    return (
        <Innhold>
            <BodyShort>Hent en liste av journalposter med oppgaveId fra saf-api</BodyShort>
            <FnrForm
                onChange={(fnr: string): void => {
                    handleClick(fnr)
                }}
            />
            {!data && !error && isPending && <Loader size="medium" />}
            {data && <Alert variant="success">{JSON.stringify(data, null, 2)}</Alert>}
            {error && <Alert variant="error">{error}</Alert>}
        </Innhold>
    )
}
export const getServerSideProps = withAuthenticatedPage()

export default HentListeAvJournalposter
