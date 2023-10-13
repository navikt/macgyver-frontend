'use client'

import { ReactElement, useState, useTransition } from 'react'
import { Alert, BodyShort, Loader } from '@navikt/ds-react'

import Innhold from '../../components/Innhold/Innhold'
import IdentEndringSykmeldtForm from '../../components/IdentEndringForm/Sykmeldt/IdentEndringSykmeldtForm'
import { identEndringSykmeldt } from '../../actions/server-actions'

function Page(): ReactElement {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const [isPending, startTransition] = useTransition()

    const handleClick = (fnr: string, nyttFnr: string): void => {
        startTransition(async (): Promise<void> => {
            if (!fnr || !nyttFnr) {
                setSuccess(false)
                setError('Mangler fnr eller nyttFnr.')
                return
            }

            try {
                await identEndringSykmeldt(fnr, nyttFnr)
                setError(null)
                setSuccess(true)
            } catch (e) {
                setSuccess(false)
                setError('Endring av fnr for sykmeldt feilet.')
            }
        })
    }

    return (
        <Innhold>
            <BodyShort>
                Endrer fnr for ein sykmeldt person i alle sykmeldinger i SyfoSmRegister og oppdaterer aktive
                NL-koblinger.
            </BodyShort>
            <IdentEndringSykmeldtForm
                onChange={(fnr: string, nyttFnr: string): void => {
                    handleClick(fnr, nyttFnr)
                }}
            />
            {isPending && !error && <Loader size="medium" />}
            {success && <Alert variant="success">Endring av fnr for sykmeldt er fullført.</Alert>}
            {error && <Alert variant="error">{error}</Alert>}
        </Innhold>
    )
}

export default Page
