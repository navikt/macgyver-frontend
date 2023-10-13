'use client'

import { Alert, BodyShort, Loader } from '@navikt/ds-react'
import { ReactElement, useState, useTransition } from 'react'

import Innhold from '../../components/Innhold/Innhold'
import SlettSykmeldingForm from '../../components/SlettSykmeldingForm/SlettSykmeldingForm'
import { slettSykmelding } from '../../actions/server-actions'

function Page(): ReactElement {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition()

    const handleClick = (sykmeldingId: string): void => {
        startTransition(async (): Promise<void> => {
            if (!sykmeldingId) {
                setSuccess(false)
                setError('Mangler sykmeldingId.')
                return
            }

            try {
                await slettSykmelding(sykmeldingId)
                setError(null)
                setSuccess(true)
            } catch (e) {
                setSuccess(false)
                setError('Sletting av sykmelding feilet.')
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

export default Page
