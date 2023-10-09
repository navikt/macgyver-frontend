'use client'

import React, { ReactElement, useState, useTransition } from 'react'
import { Alert, BodyShort, Loader } from '@navikt/ds-react'

import Innhold from '../../components/Innhold/Innhold'
import SlettLegeerklaeringForm from '../../components/Legeerklaering/SlettLegeerklaeringForm'
import { slettLegeerklaring } from '../../actions/server-actions'

function Page(): ReactElement {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition()

    const handleClick = (legeerklaeringId: string): void => {
        startTransition(async (): Promise<void> => {
            if (!legeerklaeringId) {
                setSuccess(false)
                setError('Mangler legeerklaeringId.')
                return
            }

            try {
                await slettLegeerklaring(legeerklaeringId)
                setError(null)
                setSuccess(true)
            } catch (e) {
                setSuccess(false)
                setError('Sletting av legeerklæring feilet.')
            }
        })
    }

    return (
        <Innhold>
            <BodyShort>Sletter en legeerklæring</BodyShort>
            <SlettLegeerklaeringForm
                onSubmit={(legeerklaeringId: string): void => {
                    handleClick(legeerklaeringId)
                }}
            />
            {isPending && !error && <Loader size="medium" />}
            {success && <Alert variant="success">Legeerklæring er slettet.</Alert>}
            {error && <Alert variant="error">{error}</Alert>}
        </Innhold>
    )
}

export default Page
