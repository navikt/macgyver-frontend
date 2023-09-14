import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import { useState } from 'react';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/Innhold/Innhold';
import SlettSykmeldingForm from '../../../components/SlettSykmeldingForm/SlettSykmeldingForm';

const SYKMELDING_URL = `/api/proxy/api/sykmelding`;

const SlettSykmelding = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    return (
        <Innhold>
            <BodyShort>Sletter en sykmelding</BodyShort>
            <SlettSykmeldingForm
                onSubmit={(sykmeldingId) => {
                    setIsLoading(true);
                    setSuccess(false);
                    deleteSykmelding(sykmeldingId)
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
            {success && <Alert variant="success">Sykmelding slettet</Alert>}
            {error && <Alert variant="error">Noe gikk feil ved sletting av sykmelding</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function deleteSykmelding(sykmeldingId: string): Promise<void> {
    const response = await fetch(`${SYKMELDING_URL}/${sykmeldingId}`, {
        method: 'DELETE',
    });
    logger.info(`SlettSykmelding response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
}

export default SlettSykmelding;
