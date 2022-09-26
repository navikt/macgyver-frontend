import { useState } from 'react';
import { BodyShort, Loader } from '@navikt/ds-react';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/innhold/Innhold';

import IdentEndringForm from '../../../components/IdentEndringForm/IdentEndringForm';
import useSWR from 'swr';
import { logger } from '@navikt/next-logger';

function createFetchKey(fnr: string, nyttFnr: string): string | null {
    if (fnr === '' && nyttFnr === '') {
        return null;
    } else {
        return fnr + nyttFnr;
    }
}

const SYKMELDING_FNR_URL = `/api/proxy/api/sykmelding/fnr`;

const IdentEndring = (): JSX.Element => {
    const [fnr, setFnr] = useState('');
    const [nyttFnr, setNyttFnr] = useState('');

    const fetchKey = createFetchKey(fnr, nyttFnr);

    const { data, error } = useSWR(fetchKey, () => fetchData(fnr, nyttFnr));
    return (
        <Innhold>
            <BodyShort>
                Endrer fnr for et gitt fnr i alle sykmeldinger i SyfoSmRegister og oppdaterer aktive NL-koblinger
            </BodyShort>
            <IdentEndringForm
                onChange={(fnr, nyttFnr) => {
                    setFnr(fnr);
                    setNyttFnr(nyttFnr);
                }}
            />
            {!data && !error && fetchKey && <Loader size="medium" />}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            {error && <pre>{error.message}</pre>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function fetchData(fnr: string, nyttFnr: string): Promise<unknown> {
    const identEndringData: IdentEndringData = {
        fnr: fnr,
        nyttFnr: nyttFnr,
    };

    const response = await fetch(`${SYKMELDING_FNR_URL}`, {
        method: 'POST',
        body: JSON.stringify(identEndringData),
    });
    logger.info(`Response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
    return await response.json();
}

type IdentEndringData = {
    fnr: string;
    nyttFnr: string;
};

export default IdentEndring;
