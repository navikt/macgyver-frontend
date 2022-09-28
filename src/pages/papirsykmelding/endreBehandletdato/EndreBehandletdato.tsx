import { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/Innhold/Innhold';
import EndreBehandletdatoForm from '../../../components/EndreBehandletdatoForm/EndreBehandletdatoForm';

const PAPIR_SYKMELDING_URL = `/api/proxy/api/papirsykmelding/`;

const EndretBehandletdato = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    return (
        <Innhold>
            <BodyShort>Endre behandletdato ein papir sykmelding</BodyShort>
            <EndreBehandletdatoForm
                onChange={(sykmeldingId, behandletDato) => {
                    setIsLoading(true);
                    setSuccess(false);
                    endreBehandletDato(behandletDato, sykmeldingId)
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
            {success && <Alert variant="success">BehandletDato ble endret</Alert>}
            {error && <Alert variant="error">Noe gikk feil ved endring av behandletDato</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function endreBehandletDato(behandletDato: string, sykmeldingId: string): Promise<void> {
    const behandletDatoData: BehandletDatoData = {
        behandletDato: behandletDato,
    };

    const response = await fetch(`${PAPIR_SYKMELDING_URL}/${sykmeldingId}/behandletdato`, {
        method: 'POST',
        body: JSON.stringify(behandletDatoData),
    });
    logger.info(`EndretBehandletdato response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
}

type BehandletDatoData = {
    behandletDato: string;
};

export default EndretBehandletdato;
