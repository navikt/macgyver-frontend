import { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import useSWR from 'swr';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/innhold/Innhold';
import EndreBehandletdatoForm from '../../../components/EndreBehandletdatoForm/EndreBehandletdatoForm';

function createFetchKey(sykmeldingId: string, behandletDato: string): string | null {
    if (sykmeldingId === '' && behandletDato === '') {
        return null;
    } else {
        return sykmeldingId + behandletDato;
    }
}

const SYKMELDING_URL = `/api/proxy/api/sykmelding/`;

const EndretBehandletdato = (): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState('');
    const [behandletDato, setBehandletDato] = useState('');

    const fetchKey = createFetchKey(sykmeldingId, behandletDato);

    const { data, error } = useSWR(fetchKey, () => fetchData(sykmeldingId, behandletDato));
    return (
        <Innhold>
            <BodyShort>Endre behandletdato ein papir sykmelding</BodyShort>
            <EndreBehandletdatoForm
                onChange={(sykmeldingId, behandletDato) => {
                    setSykmeldingId(sykmeldingId);
                    setBehandletDato(behandletDato);
                }}
            />
            {!data && !error && fetchKey && <Loader size="medium" />}
            {data && <Alert variant="success">{JSON.stringify(data, null, 2)}</Alert>}
            {error && <Alert variant="error">{error.message}</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function fetchData(sykmeldingId: string, behandletDato: string): Promise<unknown> {
    const behandletDatoData: BehandletDatoData = {
        behandletDato: behandletDato,
    };

    const response = await fetch(`${SYKMELDING_URL}/${sykmeldingId}/behandletdato`, {
        method: 'POST',
        body: JSON.stringify(behandletDatoData),
    });
    logger.info(`Response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
    return await response.json();
}

type BehandletDatoData = {
    behandletDato: string;
};

export default EndretBehandletdato;
