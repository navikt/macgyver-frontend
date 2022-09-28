import { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/Innhold/Innhold';
import GjenapneForm from '../../../components/GjenapneForm/GjenapneForm';

const SYKMELDING_URL = `/api/proxy/api/sykmelding`;

const Gjenapne = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    return (
        <Innhold>
            <BodyShort>Gjenåpne en sykmelding</BodyShort>
            <GjenapneForm
                onChange={(sykmeldingId) => {
                    setIsLoading(true);
                    setSuccess(false);
                    gjenapneSykmelding(sykmeldingId)
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
            {success && <Alert variant="success">Sykmelding gjenåpnet</Alert>}
            {error && <Alert variant="error">Noe gikk feil ved gjenåpning av sykmelding</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function gjenapneSykmelding(sykmeldingId: string): Promise<void> {
    const response = await fetch(`${SYKMELDING_URL}/${sykmeldingId}/gjenapne`, {
        method: 'POST',
    });
    logger.info(`Gjenapne response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
}

export default Gjenapne;
