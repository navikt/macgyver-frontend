'use client'

import { Alert, BodyShort, Loader } from '@navikt/ds-react'
import { ReactElement, useState, useTransition } from 'react'

import { withAuthenticatedPage } from '../../auth/withAuth'
import Innhold from '../../components/Innhold/Innhold'
import FnrForm from '../../components/FnrForm/FnrForm'
import { hentPerson } from '../../actions/server-actions'
import { Person } from '../../types/person'

const HentPerson = (): ReactElement => {
    const [data, setData] = useState<Person | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isPending, startTransition] = useTransition()

    const handleClick = (fnr: string): void => {
        startTransition(async (): Promise<void> => {
            try {
                const response: Person = await hentPerson(fnr)
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
            <BodyShort>Hent navn på person og liste med identer fra saf-api</BodyShort>
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

export default HentPerson
