import { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/Innhold/Innhold';
import DiagnoseEndringForm from '../../../components/DiagnoseEndringForm/DiagnoseEndringForm';

const SYKMELDING_URL = `/api/proxy/api/sykmelding/`;

const DiagnoseEndring = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    return (
        <Innhold>
            <BodyShort>Endre diagnose for sykmelding</BodyShort>
            <DiagnoseEndringForm
                onChange={(kode, system, sykmeldingId) => {
                    setIsLoading(true);
                    setSuccess(false);
                    endreHouvedDiagnose(kode, system, sykmeldingId)
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
            {error && <Alert variant="error">Noe gikk feil ved endring av houved diagnose</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function endreHouvedDiagnose(kode: string, system: string, sykmeldingId: string): Promise<void> {
    const diagnoseEndringData: DiagnoseEndringData = {
        kode: kode,
        system: system,
    };

    const response = await fetch(`${SYKMELDING_URL}/${sykmeldingId}/diagnose`, {
        method: 'POST',
        body: JSON.stringify(diagnoseEndringData),
    });
    logger.info(`DiagnoseEndring: response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
}

type DiagnoseEndringData = {
    kode: string;
    system: string;
};

export default DiagnoseEndring;
