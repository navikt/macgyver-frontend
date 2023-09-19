import { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../auth/withAuth';
import Innhold from '../../components/Innhold/Innhold';
import IdentEndringSykmeldtForm from '../../components/IdentEndringForm/Sykmeldt/IdentEndringSykmeldtForm';

const SYKMELDING_FNR_URL = `/api/proxy/api/sykmelding/fnr`;

const IdentEndringSykmeldt = (): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    return (
        <Innhold>
            <BodyShort>
                Endrer fnr for ein sykmeldt person i alle sykmeldinger i SyfoSmRegister og oppdaterer aktive
                NL-koblinger
            </BodyShort>
            <IdentEndringSykmeldtForm
                onChange={(fnr, nyttFnr) => {
                    setIsLoading(true);
                    setSuccess(false);
                    setError(null)
                    endreFnrSykmeldt(fnr, nyttFnr)
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
            {success && <Alert variant="success">Endret fnr for sykmeldt</Alert>}
            {error && <Alert variant="error">Noe gikk feil ved endring fnr for sykmeldt</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function endreFnrSykmeldt(fnr: string, nyttFnr: string): Promise<unknown> {
    const identEndringData: IdentEndringData = {
        fnr: fnr,
        nyttFnr: nyttFnr,
    };

    const response = await fetch(`${SYKMELDING_FNR_URL}`, {
        method: 'POST',
        body: JSON.stringify(identEndringData),
        headers: { 'Content-Type': 'application/json' },
    });
    logger.info(`IdentEndringSykmeldt response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
    return await response.json();
}

type IdentEndringData = {
    fnr: string;
    nyttFnr: string;
};

export default IdentEndringSykmeldt;
