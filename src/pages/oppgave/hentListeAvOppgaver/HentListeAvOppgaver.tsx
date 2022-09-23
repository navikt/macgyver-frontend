import { BodyShort, Button, TextField } from '@navikt/ds-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { logger } from '@navikt/next-logger';
import useSWR from 'swr';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import styles from '../../../styles/Forms.module.css';

const HENT_LISTE_AV_OPPGAVER_URL = `/api/proxy/api/oppgave/list`;

const HentListeAvOppgaver = (): JSX.Element => {
    const [oppgaveider, setOppgaveider] = useState<number[]>([]);

    const { data, error } = useSWR(oppgaveider, () => fetchData(oppgaveider));

    const setOppgaveiderdHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setOppgaveider(event.target.value.split(',').map(Number));
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setOppgaveider(oppgaveider);
    };

    return (
        <div className={styles.innhold}>
            <BodyShort>Hent en liste av oppgaver med oppgaveId fra Oppgave-api: eks: 2,3,4,5</BodyShort>
            <form onSubmit={submitHandler} className={styles.form}>
                <TextField label="oppgaveider" size="medium" onChange={setOppgaveiderdHandler} />
                <Button variant="primary" size="medium" className={styles.button}>
                    Hent
                </Button>
            </form>
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
