import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { useState } from 'react';
import { logger } from '@navikt/next-logger';
import useSWR from 'swr';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/Innhold/Innhold';
import FnrForm from '../../../components/FnrForm/FnrForm';

const HENT_LISTE_AV_JOURNALPOSTER_URL = `/api/proxy/api/journalposter`;

function createFetchKey(fnr: string): string {
    return fnr;
}

const HentListeAvJournalposter = (): JSX.Element => {
    const [fnr, setFnr] = useState('');

    const fetchKey = createFetchKey(fnr);

    const { data, error } = useSWR(fetchKey, () => fetchData(fnr));

    return (
        <Innhold>
            <BodyShort>Hent en liste av journalposter med oppgaveId fra saf-api</BodyShort>
            <FnrForm
                onChange={(fnr) => {
                    setFnr(fnr);
                }}
            />
            {!data && !error && fetchKey && <Loader size="medium" />}
            {data && <Alert variant="success">{JSON.stringify(data, null, 2)}</Alert>}
            {error && <Alert variant="error">{error.message}</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function fetchData(fnr: string): Promise<unknown> {
    const response = await fetch(HENT_LISTE_AV_JOURNALPOSTER_URL + `/${fnr}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    logger.info(
        `HentListeAvJournalposter response status is: ${response.status} and statusText ${response.statusText}`,
    );
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
    return await response.json();
}

export default HentListeAvJournalposter;
