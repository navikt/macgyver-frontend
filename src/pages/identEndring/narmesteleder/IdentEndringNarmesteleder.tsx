import { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import useSWR from 'swr';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/innhold/Innhold';
import IdentEndringNarmestelederForm from '../../../components/IdentEndringForm/Narmesteleder/IdentEndringNarmestelederForm';

function createFetchKey(fnr: string, nyttFnr: string): string | null {
    if (fnr === '' && nyttFnr === '') {
        return null;
    } else {
        return fnr + nyttFnr;
    }
}

const SYKMELDING_LEDER_FNR_URL = `/api/proxy/api/leder/fnr`;

const IdentEndringNarmesteleder = (): JSX.Element => {
    const [fnr, setFnr] = useState('');
    const [nyttFnr, setNyttFnr] = useState('');

    const fetchKey = createFetchKey(fnr, nyttFnr);

    const { data, error } = useSWR(fetchKey, () => fetchData(fnr, nyttFnr));
    return (
        <Innhold>
            <BodyShort>Endre fnr for nærmeste leder, oppdaterer aktive NL-koblinger for leder med nytt fnr</BodyShort>
            <IdentEndringNarmestelederForm
                onChange={(fnr, nyttFnr) => {
                    setFnr(fnr);
                    setNyttFnr(nyttFnr);
                }}
            />
            {!data && !error && fetchKey && <Loader size="medium" />}
            {data && <Alert variant="success">{JSON.stringify(data, null, 2)}</Alert>}
            {error && <Alert variant="error">{error.message}</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function fetchData(fnr: string, nyttFnr: string): Promise<unknown> {
    const identEndringData: IdentEndringData = {
        fnr: fnr,
        nyttFnr: nyttFnr,
    };

    const response = await fetch(`${SYKMELDING_LEDER_FNR_URL}`, {
        method: 'POST',
        body: JSON.stringify(identEndringData),
    });
    logger.info(
        `IdentEndringNarmesteleder·response·status·is:·${response.status}·and·statusText·${response.statusText}`,
    );
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
    return await response.json();
}

type IdentEndringData = {
    fnr: string;
    nyttFnr: string;
};

export default IdentEndringNarmesteleder;
