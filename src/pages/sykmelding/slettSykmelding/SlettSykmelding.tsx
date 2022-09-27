import { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/innhold/Innhold';
import SlettSykmeldingForm from '../../../components/slettSykmeldingForm/SlettSykmeldingForm';

const SYKMELDING_URL = `/api/proxy/api/sykmelding`;

const SlettSykmelding = (): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);

    const postData = async (): Promise<void> => {
        const response = await fetch(`${SYKMELDING_URL}/${sykmeldingId}`, {
            method: 'DELETE',
        });
        logger.info(`Response status is: ${response.status} and statusText ${response.statusText}`);
        if (response.ok) {
            setResult((await response.json()).message);
        } else {
            setError((await response.json()).message);
        }
    };

    return (
        <Innhold>
            <BodyShort>Sletter en sykmelding</BodyShort>
            <SlettSykmeldingForm
                onChange={(sykmeldingId) => {
                    setSykmeldingId(sykmeldingId);
                    postData();
                }}
            />
            {!result && !error && sykmeldingId && <Loader size="medium" />}
            {error && <Alert variant="error">{error}</Alert>}
            {result && <Alert variant="success">{result}</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

export default SlettSykmelding;
