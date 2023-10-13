'use client'

import { ReactElement, useState, useTransition } from 'react'
import { Alert, BodyShort, Loader } from '@navikt/ds-react'

import Innhold from '../../components/Innhold/Innhold'
import NyNLRequestAltinnForm from '../../components/NyNLRequestAltinnForm/NyNLRequestAltinnForm'
import { nlRequestAltinn } from '../../actions/server-actions'

function Page(): ReactElement {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition()

    const handleClick = (sykmeldingId: string, fnr: string, orgnummer: string): void => {
        startTransition(async (): Promise<void> => {
            if (!sykmeldingId || !fnr || !orgnummer) {
                setSuccess(false)
                setError('Mangler sykmeldingId, fnr eller orgnummer.')
                return
            }

            try {
                await nlRequestAltinn(sykmeldingId, fnr, orgnummer)
                setError(null)
                setSuccess(true)
            } catch (e) {
                setSuccess(false)
                setError('Ny NL-request til altinn feilet.')
            }
        })
    }

    return (
        <Innhold>
            <BodyShort>Sender ny NL-request til altinn</BodyShort>
            <NyNLRequestAltinnForm
                onChange={(sykmeldingId: string, fnr: string, orgnummer: string): void => {
                    handleClick(sykmeldingId, fnr, orgnummer)
                }}
            />
            {isPending && !error && <Loader size="medium" />}
            {success && <Alert variant="success">Ny NL-request er sendt til altinn.</Alert>}
            {error && <Alert variant="error">{error}</Alert>}
        </Innhold>
    )
}

export default Page
