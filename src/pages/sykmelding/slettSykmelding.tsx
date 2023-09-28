'use client'

import { Alert, BodyShort, Loader } from '@navikt/ds-react'
import { ReactElement, useState, useTransition } from 'react'

import { withAuthenticatedPage } from '../../auth/withAuth'
import Innhold from '../../components/Innhold/Innhold'
import SlettSykmeldingForm from '../../components/SlettSykmeldingForm/SlettSykmeldingForm'
import { slettSykmelding } from '../../actions/server-actions'

const SlettSykmelding = (): ReactElement => {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition()

    const handleClick = (sykmeldingId: string): void => {
        startTransition(async (): Promise<void> => {
            try {
                await slettSykmelding(sykmeldingId)
                setError(null)
                setSuccess(true)
            } catch (e) {
                setSuccess(false)
                setError(`Sletting av sykmelding feilet. ${e}`)
            }
        })
    }

    return (
        <Innhold>
            <BodyShort>Sletter en sykmelding</BodyShort>
            <SlettSykmeldingForm
                onSubmit={(sykmeldingId: string): void => {
                    handleClick(sykmeldingId)
                }}
            />
            {isPending && !error && <Loader size="medium" />}
            {success && <Alert variant="success">Sykmeldingen er slettet.</Alert>}
            {error && <Alert variant="error">{error}</Alert>}
        </Innhold>
    )
}
export const getServerSideProps = withAuthenticatedPage()

export default SlettSykmelding
