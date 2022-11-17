import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { useState } from 'react';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/Innhold/Innhold';
import FerdigstillSmregForm from '../../../components/FerdigstillSmregForm/FerdigstillSmregForm';

const SMREG_URL = `/api/proxy/api/smregistrering`;

const FerdigstillSmregistreringOppgave = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    return (
        <Innhold>
            <BodyShort>Ferdigstill smregistreringsoppgave</BodyShort>
            <FerdigstillSmregForm
                onChange={(journalpostId) => {
                    setIsLoading(true);
                    setSuccess(false);
                    ferdigstillSmregistreringOppgave(journalpostId)
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
            {success && <Alert variant="success">Ferdigstilt smregistreringsoppgave</Alert>}
            {error && <Alert variant="error">Noe gikk galt ved ferdigstilling av smregistreringsoppgave</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function ferdigstillSmregistreringOppgave(journalpostId: string): Promise<void> {
    const response = await fetch(`${SMREG_URL}/${journalpostId}/ferdigstill`, {
        method: 'POST',
    });
    logger.info(`Ferdigstill response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
}

export default FerdigstillSmregistreringOppgave;
