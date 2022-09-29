import React, { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';

import Innhold from '../../../components/Innhold/Innhold';
import { withAuthenticatedPage } from '../../../auth/withAuth';
import SlettLegeerklaeringForm from '../../../components/Legeerklaering/SlettLegeerklaeringForm';

const LEGEERKLARING_URL = `/api/proxy/api/legeerklaering`;

const SlettLegeerklaring = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    return (
        <Innhold>
            <BodyShort>Sletter en legeerklaering</BodyShort>
            <SlettLegeerklaeringForm
                onSubmit={(legeerklaeringId) => {
                    setIsLoading(true);
                    setSuccess(false);
                    deleteLegeerklaring(legeerklaeringId)
                        .then(() => {
                            setSuccess(true);
                        })
                        .catch((error) => {
                            setError(error.message);
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                }}
            />
            {isLoading && !error && <Loader size="medium" />}
            {success && <Alert variant="success">Legeerklaring slettet</Alert>}
            {error && <Alert variant="error">Noe gikk feil ved sletting av legeerklaring</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function deleteLegeerklaring(legeerklaeringId: string): Promise<void> {
    const response = await fetch(`${LEGEERKLARING_URL}/${legeerklaeringId}`, {
        method: 'DELETE',
    });
    logger.info(`SlettLegeerklaring response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
}

export default SlettLegeerklaring;
