import { ReactElement } from 'react'

import { Alert, BodyShort, Heading } from '../components/ds/ds-react'

function NotFound(): ReactElement {
    return (
        <Alert variant="warning">
            <Heading size="medium" level="2" spacing>
                Fant ikke denne siden!
            </Heading>
            <BodyShort>Kontakt oss gjerne på slack og fortell oss om hvordan du kom til denne siden.</BodyShort>
        </Alert>
    )
}

export default NotFound
