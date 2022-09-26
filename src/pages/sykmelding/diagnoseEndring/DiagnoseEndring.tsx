import { useState } from 'react';
import { BodyShort, Loader } from '@navikt/ds-react';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/innhold/Innhold';
import DiagnoseEndringForm from '../../../components/DiagnoseEndringForm/DiagnoseEndringForm';
import useSWR from 'swr';
import { logger } from '@navikt/next-logger';

function createFetchKey(kode: string, system: string, sykmeldingId: string): string | null {
    if (kode === '' && system === '' && sykmeldingId === '') {
        return null;
    } else {
        return kode + system + sykmeldingId;
    }
}

const SYKMELDING_URL = `/api/proxy/api/sykmelding/`;

const DiagnoseEndring = (): JSX.Element => {
    const [kode, setKode] = useState('');
    const [system, setSystem] = useState('');
    const [sykmeldingId, setSykmeldingId] = useState('');

    const fetchKey = createFetchKey(kode, system, sykmeldingId);

    const { data, error } = useSWR(fetchKey, () => fetchData(kode, system, sykmeldingId));

    return (
        <Innhold>
            <BodyShort>Endre diagnose for sykmelding</BodyShort>
            <DiagnoseEndringForm
                onChange={(kode, system, sykmeldingId) => {
                    setKode(kode);
                    setSystem(system);
                    setSykmeldingId(sykmeldingId);
                }}
            />
            {!data && !error && fetchKey && <Loader size="medium" />}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            {error && <pre>{error.message}</pre>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function fetchData(kode: string, system: string, sykmeldingId: string): Promise<unknown> {
    const diagnoseEndringData: DiagnoseEndringData = {
        kode: system,
        system: system,
    };

    const response = await fetch(`${SYKMELDING_URL}/${sykmeldingId}/diagnose`, {
        method: 'POST',
        body: JSON.stringify(diagnoseEndringData),
    });
    logger.info(`Response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
    return await response.json();
}

type DiagnoseEndringData = {
    kode: string;
    system: string;
};

export default DiagnoseEndring;
