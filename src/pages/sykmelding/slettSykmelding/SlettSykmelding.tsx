import { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';
import useSWR from 'swr';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/innhold/Innhold';
import SlettSykmeldingForm from '../../../components/slettSykmeldingForm/SlettSykmeldingForm';

const SYKMELDING_URL = `/api/proxy/api/sykmelding`;

function createFetchKey(sykmeldingId: string): string | null {
    if (sykmeldingId === '') {
        return null;
    } else {
        return sykmeldingId;
    }
}

const SlettSykmelding = (): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState<string>('');

    const fetchKey = createFetchKey(sykmeldingId);

    const { data, error } = useSWR(fetchKey, () => fetchData(sykmeldingId), {
        refreshWhenOffline: false,
        shouldRetryOnError: false,
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
        revalidateIfStale: false,
    });

    return (
        <Innhold>
            <BodyShort>Sletter en sykmelding</BodyShort>
            <SlettSykmeldingForm
                onChange={(sykmeldingId) => {
                    setSykmeldingId(sykmeldingId);
                }}
            />
            {!data && !error && fetchKey && <Loader size="medium" />}
            {data && <Alert variant="success">Sykmelding slettet</Alert>}
            {error && <Alert variant="error">Noe gikk feil ved sletting av sykmelding</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function fetchData(sykmeldingId: string): Promise<unknown> {
    const response = await fetch(`${SYKMELDING_URL}/${sykmeldingId}`, {
        method: 'DELETE',
    });
    logger.info(`Response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
    return await response.json();
}

export default SlettSykmelding;
