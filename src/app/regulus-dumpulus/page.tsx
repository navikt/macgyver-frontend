'use client'

import React, { ReactElement, startTransition } from 'react'
import Innhold from '../../components/Innhold/Innhold'
import { Alert, BodyShort, Button, Heading } from '@navikt/ds-react'
import { runRegulusDumpulus } from '../../actions/server-actions'
import { logger } from '@navikt/next-logger'

function Page(): ReactElement {
    const [hasRun, setHasRun] = React.useState(false)
    const [hasFailed, setHasFailed] = React.useState<string | null>(null)

    return (
        <Innhold>
            <Heading size="large" level="2">
                Regulus Dumpulus
            </Heading>
            <BodyShort>One time job for å dumpe register til migreringstopic</BodyShort>
            <div className="m-8">
                <Button
                    disabled={hasRun}
                    onClick={() => {
                        setHasRun(true)
                        startTransition(() => {
                            runRegulusDumpulus()
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
                >
                    Kjør jobb
                </Button>
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
