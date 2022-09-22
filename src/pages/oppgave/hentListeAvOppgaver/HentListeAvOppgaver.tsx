import { BodyShort, Button, TextField } from '@navikt/ds-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import styles from '../../../styles/Forms.module.css';

const HentListeAvOppgaver = (): JSX.Element => {
    const [oppgaveider, setOppgaveider] = useState('');

    const setOppgaveiderdHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setOppgaveider(event.target.value);
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setOppgaveider(oppgaveider);

        postData(oppgaveider.split(',').map(Number));
    };

    const HENT_LISTE_AV_OPPGAVER_URL = `/api/proxy/api/oppgave/list`;

    logger.info(`json body: ${JSON.parse(JSON.stringify(oppgaveider))}`);

    const postData = async (oppgaveider: number[]): Promise<void> => {
        const response = await fetch(HENT_LISTE_AV_OPPGAVER_URL, {
            method: 'POST',
            body: JSON.parse(JSON.stringify(oppgaveider)),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            logger.info(`Response is OK, message is: ${await response.json()}`);
        } else {
            logger.info(`Response is not OK, message is: ${await response.json()}`);
        }
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

export default HentListeAvOppgaver;
