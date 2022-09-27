import { useState } from 'react';
import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import useSWR from 'swr';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import Innhold from '../../../components/innhold/Innhold';
import NyNLRequestAltinnForm from '../../../components/nyNLRequestAltinnForm/NyNLRequestAltinnForm';

function createFetchKey(sykmeldingId: string, fnr: string, orgnummer: string): string | null {
    if (sykmeldingId === '' && fnr === '' && orgnummer === '') {
        return null;
    } else {
        return sykmeldingId + fnr + orgnummer;
    }
}

const NARMESTELEDER_URL = `/api/proxy/api/narmesteleder/request`;

const NyNLRequestAltinn = (): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState('');
    const [fnr, setFnr] = useState('');
    const [orgnummer, setOrgnummer] = useState('');

    const fetchKey = createFetchKey(sykmeldingId, fnr, orgnummer);

    const { data, error } = useSWR(fetchKey, () => fetchData(sykmeldingId, fnr, orgnummer));

    return (
        <Innhold>
            <BodyShort>Sender ny NL-request til altinn</BodyShort>
            <NyNLRequestAltinnForm
                onChange={(sykmeldingId, fnr, orgnummer) => {
                    setSykmeldingId(sykmeldingId);
                    setFnr(fnr);
                    setOrgnummer(orgnummer);
                }}
            />
            {!data && !error && fetchKey && <Loader size="medium" />}
            {data && <Alert variant="success">{JSON.stringify(data, null, 2)}</Alert>}
            {error && <Alert variant="error">{error.message}</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function fetchData(sykmeldingId: string, fnr: string, orgnummer: string): Promise<unknown> {
    const nyNLRequestData: NyNLRequestData = {
        sykmeldingId: sykmeldingId,
        fnr: fnr,
        orgnummer: orgnummer,
    };

    const response = await fetch(`${NARMESTELEDER_URL}`, {
        method: 'POST',
        body: JSON.stringify(nyNLRequestData),
    });
    logger.info(`Response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
    return await response.json();
}

type NyNLRequestData = {
    sykmeldingId: string;
    fnr: string;
    orgnummer: string;
};

export default NyNLRequestAltinn;
