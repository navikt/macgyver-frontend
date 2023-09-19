import { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../auth/withAuth';
import Innhold from '../../components/Innhold/Innhold';
import NyNLRequestAltinnForm from '../../components/NyNLRequestAltinnForm/NyNLRequestAltinnForm';

const NARMESTELEDER_URL = `/api/proxy/api/narmesteleder/request`;

const NyNLRequestAltinn = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    return (
        <Innhold>
            <BodyShort>Sender ny NL-request til altinn</BodyShort>
            <NyNLRequestAltinnForm
                onChange={(sykmeldingId, fnr, orgnummer) => {
                    setIsLoading(true);
                    setSuccess(false);
                    setError(null)
                    nyNLRequestAltinn(sykmeldingId, fnr, orgnummer)
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
            {success && <Alert variant="success">Ny NL-request sendt til altinn</Alert>}
            {error && <Alert variant="error">Noe gikk feil ved sending ny NL-request til altinn</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function nyNLRequestAltinn(sykmeldingId: string, fnr: string, orgnummer: string): Promise<unknown> {
    const nyNLRequestData: NyNLRequestData = {
        sykmeldingId: sykmeldingId,
        fnr: fnr,
        orgnummer: orgnummer,
    };

    const response = await fetch(`${NARMESTELEDER_URL}`, {
        method: 'POST',
        body: JSON.stringify(nyNLRequestData),
        headers: { 'Content-Type': 'application/json' },
    })
    logger.info(`NyNLRequestAltinn response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
    return await response.json();
}

type NyNLRequestData = {
    sykmeldingId: string;
    fnr: string;
    orgnummer: string;
};

export default NyNLRequestAltinn;
