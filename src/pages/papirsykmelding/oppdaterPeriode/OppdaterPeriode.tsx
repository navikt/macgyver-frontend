import { useState } from 'react';
import { Alert, Detail, Heading, Loader } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/Innhold/Innhold';
import OppdaterPeriodeForm from '../../../components/OppdaterPeriodeForm/OppdaterPeriodeForm';

const PAPIR_SYKMELDING_URL = `/api/proxy/api/papirsykmelding/`;

const OppdaterPeriode = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    return (
        <Innhold>
            <Heading level="2" size="medium" spacing>
                Endre periode for en sykmelding
            </Heading>
            <Detail>
                Hent periodelisten fra databasen, gjør tilpasninger og send den inn som periodeliste i dette skjemaet.
            </Detail>
            <OppdaterPeriodeForm
                onChange={(sykmeldingId, periodeListe) => {
                    setIsLoading(true);
                    setSuccess(false);
                    endrePeriode(periodeListe, sykmeldingId)
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
            {success && <Alert variant="success">Periode ble endret</Alert>}
            {error && <Alert variant="error">Noe gikk feil ved endring av periode</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function endrePeriode(periodeliste: string, sykmeldingId: string): Promise<void> {
    const response = await fetch(`${PAPIR_SYKMELDING_URL}/${sykmeldingId}/periode`, {
        method: 'POST',
        body: periodeliste,
    });
    logger.info(`Oppdater periode response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
}

export default OppdaterPeriode;
