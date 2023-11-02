'use client'

import { ReactElement, useState, useTransition } from 'react'
import { Alert, BodyShort, Loader } from '@navikt/ds-react'

import Innhold from '../../components/Innhold/Innhold'
import { Narmesteldere } from '../../types/narmesteldere'
import { narmesteldereRequest } from '../../actions/server-actions'
import NLRequestForm from '../../components/NLRequestForm/NLRequestForm'
import NarmesteldereList from '../../components/NLRequestForm/NarmesteldereList'

function Page(): ReactElement {
    const [data, setData] = useState<Narmesteldere[] | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleClick = (sykmeldtFnr: string): void => {
        startTransition(async (): Promise<void> => {
            if (!sykmeldtFnr) {
                setData(null)
                setError('Mangler sykmeldtFnr')
                return
            }

            try {
                const response: Narmesteldere[] = await narmesteldereRequest(sykmeldtFnr)
                setData(response)
                setError(null)
            } catch (e) {
                setData(null)
                setError('Henting av narmesteldere for ein sykmeldte feilet. ')
            }
        })
    }

    return (
        <Innhold>
            <BodyShort>Henting narmesteldere for ein sykmeldt person</BodyShort>
            <NLRequestForm
                onChange={(sykmeldtFnr: string): void => {
                    handleClick(sykmeldtFnr)
                }}
            />
            {!data && !error && isPending && <Loader size="medium" />}
            {data && (
                <div className="flex flex-wrap gap-6">
                    {data.map((narmesteldere: Narmesteldere) => (
                        <NarmesteldereList key={narmesteldere.fnr} narmesteldere={narmesteldere} />
                    ))}
                </div>
            )}
            {error && <Alert variant="error">{error}</Alert>}
        </Innhold>
    )
}

export default Page
