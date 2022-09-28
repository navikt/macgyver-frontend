import { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/Innhold/Innhold';
import BiDiagnoseEndringForm from '../../../components/BiDiagnoseEndringForm/BiDiagnoseEndringForm';

const SYKMELDING_URL = `/api/proxy/api/sykmelding/`;

const BiDiagnoseEndring = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    return (
        <Innhold>
            <BodyShort>Endre Bi-diagnose for sykmelding</BodyShort>
            <BiDiagnoseEndringForm
                onChange={(biDiagonser, sykmeldingId) => {
                    setIsLoading(true);
                    setSuccess(false);
                    endreBiDiagnose(biDiagonser, sykmeldingId)
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
            {success && <Alert variant="success">Bi-diagnose er endret</Alert>}
            {error && <Alert variant="error">Noe gikk feil ved endring av bi diagnose</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function endreBiDiagnose(biDiagonser: BiDiagnose[], sykmeldingId: string): Promise<void> {
    const biDiagnoseEndringData: BiDiagnoseEndringData = {
        diagnoser: biDiagonser,
    };

    const response = await fetch(`${SYKMELDING_URL}/${sykmeldingId}/bidiagnose`, {
        method: 'POST',
        body: JSON.stringify(biDiagnoseEndringData),
    });
    logger.info(`BiDiagnoseEndring response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
}

type BiDiagnoseEndringData = {
    diagnoser: BiDiagnose[];
};

export type BiDiagnose = {
    kode: string;
    system: string;
};

export default BiDiagnoseEndring;
