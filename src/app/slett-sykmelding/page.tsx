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

    const handleClick = (sykmeldingId: string, journalpostId: string): void => {
        startTransition(async (): Promise<void> => {
            if (!sykmeldingId) {
                setSuccess(false)
                setError('Mangler sykmeldingId.')
                return
            }

            if (!journalpostId) {
                setSuccess(false)
                setError('Mangler journalpostId.')
                return
            }

            try {
                await slettSykmelding(sykmeldingId, journalpostId)
                setError(null)
                setSuccess(true)
            } catch (e) {
                setSuccess(false)
                setError('Sletting av sykmelding feilet.')
                logger.error(e)
            }
        })
    }

    return (
        <Innhold>
            <BodyShort>Sletter en sykmelding</BodyShort>
            <SlettSykmeldingForm
                onSubmit={(sykmeldingId: string, journalpostId: string): void => {
                    handleClick(sykmeldingId, journalpostId)
                }}
            />
            {isPending && !error && <Loader size="medium" />}
            {success && <Alert variant="success">Sykmeldingen er slettet.</Alert>}
            {error && <Alert variant="error">{error}</Alert>}
        </Innhold>
    )
}

export default Page
