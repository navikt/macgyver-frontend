import { Alert, BodyShort, Loader } from '@navikt/ds-react';
import { useState } from 'react';
import { logger } from '@navikt/next-logger';
import useSWR from 'swr';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import OppgaveIdForm from '../../../components/OppgaveIdForm/OppgaveIdForm';
import Innhold from '../../../components/Innhold/Innhold';

const HENT_LISTE_AV_OPPGAVER_URL = `/api/proxy/api/oppgave/list`;

function createFetchKey(oppgaveIder: number[]): string | null {
    if (oppgaveIder.length === 0) {
        return null;
    } else {
        return oppgaveIder.join(',');
    }
}

const HentListeAvOppgaver = (): JSX.Element => {
    const [oppgaveider, setOppgaveider] = useState<number[]>([]);

    const fetchKey = createFetchKey(oppgaveider);

    const { data, error } = useSWR(fetchKey, () => fetchData(oppgaveider));

    return (
        <Innhold>
            <BodyShort>Hent en liste av oppgaver med oppgaveId fra Oppgave-api: eks: 2,3,4,5</BodyShort>
            <OppgaveIdForm
                onChange={(oppgaveIder) => {
                    setOppgaveider(oppgaveIder);
                }}
            />
            {!data && !error && fetchKey && <Loader size="medium" />}
            {data && <Alert variant="success">{JSON.stringify(data, null, 2)}</Alert>}
            {error && <Alert variant="error">{error.message}</Alert>}
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function fetchData(oppgaveider: number[]): Promise<unknown> {
    const response = await fetch(HENT_LISTE_AV_OPPGAVER_URL, {
        method: 'POST',
        body: JSON.stringify(oppgaveider),
        headers: { 'Content-Type': 'application/json' },
    });
    logger.info(`HentListeAvOppgaver response status is: ${response.status} and statusText ${response.statusText}`);
    if (!response.ok) {
        throw new Error(`Httpstatus code is ${response.status}`);
    }
    return await response.json();
}

export default HentListeAvOppgaver;
