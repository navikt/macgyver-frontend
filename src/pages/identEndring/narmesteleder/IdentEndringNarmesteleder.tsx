import { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/Innhold/Innhold';
import IdentEndringNarmestelederForm from '../../../components/IdentEndringForm/Narmesteleder/IdentEndringNarmestelederForm';

const SYKMELDING_LEDER_FNR_URL = `/api/proxy/api/leder/fnr`;

const IdentEndringNarmesteleder = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    return (
        <Innhold>
            <BodyShort>Endre fnr for nærmeste leder, oppdaterer aktive NL-koblinger for leder med nytt fnr</BodyShort>
            <IdentEndringNarmestelederForm
                onChange={(fnr, nyttFnr) => {
                    setIsLoading(true);
                    setSuccess(false);
                    endreFnrNarmesteleder(fnr, nyttFnr)
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
            {success && <Alert variant="success">Endret fnr for nærmeste leder</Alert>}
            {error && <Alert variant="error">Noe gikk feil ved endring fnr for nærmeste leder</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function endreFnrNarmesteleder(fnr: string, nyttFnr: string): Promise<void> {
    const identEndringData: IdentEndringData = {
        fnr: fnr,
        nyttFnr: nyttFnr,
    };

    const response = await fetch(`${SYKMELDING_LEDER_FNR_URL}`, {
        method: 'POST',
        body: JSON.stringify(identEndringData),
        headers: { 'Content-Type': 'application/json' },
    });
    logger.info(
        `IdentEndringNarmesteleder·response·status·is:·${response.status}·and·statusText·${response.statusText}`,
    );
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
}

type IdentEndringData = {
    fnr: string;
    nyttFnr: string;
};

export default IdentEndringNarmesteleder;
