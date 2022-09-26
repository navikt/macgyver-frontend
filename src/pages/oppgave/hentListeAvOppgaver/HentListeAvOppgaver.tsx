import { BodyShort, Loader } from '@navikt/ds-react';
import { useState } from 'react';
import { logger } from '@navikt/next-logger';
import useSWR from 'swr';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import OppgaveIdForm from '../../../components/oppgaveIdForm/OppgaveIdForm';

import styles from './HentListeAvOppgaver.module.css';

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
        <div className={styles.innhold}>
            <BodyShort>Hent en liste av oppgaver med oppgaveId fra Oppgave-api: eks: 2,3,4,5</BodyShort>
            <OppgaveIdForm
                onChange={(oppgaveIder) => {
                    setOppgaveider(oppgaveIder);
                }}
            />
            {!data && !error && fetchKey && <Loader size="medium" />}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        </div>
    );
};
export const getServerSideProps = withAuthenticatedPage();

async function fetchData(oppgaveider: number[]): Promise<unknown> {
    const response = await fetch(HENT_LISTE_AV_OPPGAVER_URL, {
        method: 'POST',
        body: JSON.stringify(oppgaveider),
    });
    logger.info(`Response status is: ${response.status} and statusText ${response.statusText}`);
    return await response.json();
}

export default HentListeAvOppgaver;
