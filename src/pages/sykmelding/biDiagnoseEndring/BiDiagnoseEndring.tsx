import { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import useSWR from 'swr';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/innhold/Innhold';
import BiDiagnoseEndringForm from '../../../components/BiDiagnoseEndringForm/BiDiagnoseEndringForm';

function createFetchKey(kode: string, system: string, sykmeldingId: string): string | null {
    if (kode === '' && system === '' && sykmeldingId === '') {
        return null;
    } else {
        return kode + system + sykmeldingId;
    }
}

const SYKMELDING_URL = `/api/proxy/api/sykmelding/`;

const BiDiagnoseEndring = (): JSX.Element => {
    const [kode, setKode] = useState('');
    const [system, setSystem] = useState('');

    const [sykmeldingId, setSykmeldingId] = useState('');

    const fetchKey = createFetchKey(kode, system, sykmeldingId);

    const { data, error } = useSWR(fetchKey, () => fetchData(kode, system, sykmeldingId));

    return (
        <Innhold>
            <BodyShort>Endre Bi-diagnose for sykmelding</BodyShort>
            <BiDiagnoseEndringForm
                onChange={(kode, system, sykmeldingId) => {
                    setKode(kode);
                    setSystem(system);
                    setSykmeldingId(sykmeldingId);
                }}
            />
            {!data && !error && fetchKey && <Loader size="medium" />}
            {data && <Alert variant="success">{JSON.stringify(data, null, 2)}</Alert>}
            {error && <Alert variant="error">{error.message}</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function fetchData(kode: string, system: string, sykmeldingId: string): Promise<unknown> {
    const diagnose: Diagnose = {
        kode: system,
        system: system,
    };

    const biDiagnoseEndringData: BiDiagnoseEndringData = {
        diagnoser: [diagnose],
    };

    const response = await fetch(`${SYKMELDING_URL}/${sykmeldingId}/bidiagnose`, {
        method: 'POST',
        body: JSON.stringify(biDiagnoseEndringData),
    });
    logger.info(`Response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
    return await response.json();
}

type BiDiagnoseEndringData = {
    diagnoser: Diagnose[];
};

type Diagnose = {
    kode: string;
    system: string;
};

export default BiDiagnoseEndring;
