'use client'

import * as R from 'remeda'
import React, { ReactElement, startTransition, useState } from 'react'
import Innhold from '../../components/Innhold/Innhold'
import { Alert, BodyShort, Button, Heading, Select } from '@navikt/ds-react'
import { runRegulusDumpulus } from '../../actions/server-actions'
import { logger } from '@navikt/next-logger'
import { getYear } from 'date-fns'

function Page(): ReactElement {
    const [selectedYear, setSelectedYear] = useState<string>('alle')
    const [hasRun, setHasRun] = useState(false)
    const [hasFailed, setHasFailed] = useState<string | null>(null)

    return (
        <Innhold>
            <Heading size="large" level="2">
                Regulus Dumpulus
            </Heading>
            <BodyShort>One time job for å dumpe register til migreringstopic</BodyShort>
            <div className="m-8 flex gap-4 items-end">
                <Select
                    label="Velg år"
                    value={selectedYear}
                    onChange={(event) => setSelectedYear(event.currentTarget.value)}
                    size="small"
                >
                    <option value="alle">Alle</option>
                    {R.range(2016, getYear(new Date())).map((year) => (
                        <option key={year} value={year.toString()}>
                            {year}
                        </option>
                    ))}
                </Select>
                <div>
                    <Button
                        disabled={hasRun}
                        onClick={() => {
                            setHasRun(true)
                            startTransition(() => {
                                runRegulusDumpulus(selectedYear === 'alle' ? null : +selectedYear)
                                    .then((good) => {
                                        if (!good) {
                                            setHasRun(false)
                                            setHasFailed('Jobben kunne ikke starte, sjekk loggene')
                                        }
                                    })

                                    .catch((e) => {
                                        logger.error(e)
                                        setHasRun(false)
                                        setHasFailed(e.message)
                                    })
                            })
                        }}
                        size="small"
                    >
                        Kjør jobb
                    </Button>
                </div>
            </div>
            {hasRun && <BodyShort>Jobben er startet</BodyShort>}
            {hasFailed && (
                <Alert variant="error" className="max-w-prose">
                    Jobben feilet: {hasFailed}
                </Alert>
            )}
        </Innhold>
    )
}

export default Page
