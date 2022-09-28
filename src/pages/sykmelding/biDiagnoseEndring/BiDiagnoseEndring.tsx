import { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import useSWR from 'swr';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/innhold/Innhold';
import BiDiagnoseEndringForm from '../../../components/BiDiagnoseEndringForm/BiDiagnoseEndringForm';

function createFetchKey(biDiagonser: BiDiagnose[], sykmeldingId: string): string | null {
    if (biDiagonser.length === 0 && sykmeldingId === '') {
        return null;
    } else {
        return biDiagonser + sykmeldingId;
    }
}

const SYKMELDING_URL = `/api/proxy/api/sykmelding/`;

const BiDiagnoseEndring = (): JSX.Element => {
    const [biDiagonser, setBidiagnoser] = useState<BiDiagnose[]>([]);

    const [sykmeldingId, setSykmeldingId] = useState('');

    const fetchKey = createFetchKey(biDiagonser, sykmeldingId);

    const { data, error } = useSWR(fetchKey, () => fetchData(biDiagonser, sykmeldingId));

    return (
        <Innhold>
            <BodyShort>Endre Bi-diagnose for sykmelding</BodyShort>
            <BiDiagnoseEndringForm
                onChange={(biDiagonser, sykmeldingId) => {
                    setBidiagnoser(biDiagonser);
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

async function fetchData(biDiagonser: BiDiagnose[], sykmeldingId: string): Promise<unknown> {
    const biDiagnoseEndringData: BiDiagnoseEndringData = {
        diagnoser: biDiagonser,
    };

    const response = await fetch(`${SYKMELDING_URL}/${sykmeldingId}/bidiagnose`, {
        method: 'POST',
        body: JSON.stringify(biDiagnoseEndringData),
    });
    logger.info(`BiDiagnoseEndring response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
    return await response.json();
}

type BiDiagnoseEndringData = {
    diagnoser: BiDiagnose[];
};

export type BiDiagnose = {
    kode: string;
    system: string;
};

export default BiDiagnoseEndring;
