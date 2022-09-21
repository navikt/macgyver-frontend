import { ChangeEvent, FormEvent, useState } from 'react';
import { BodyShort, Button, TextField } from '@navikt/ds-react';

import '@navikt/ds-css';
import '@navikt/ds-css-internal';
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

        //TODO also send to backend api
    };

    return (
        <div className={styles.innhold}>
            <BodyShort>Hent en liste av oppgaver med oppgaveId fra Oppgave-api: eks: 2,3,4,5</BodyShort>
            <form onSubmit={submitHandler}>
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
