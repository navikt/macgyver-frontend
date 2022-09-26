import { ChangeEvent, FormEvent, useState } from 'react';
import { BodyShort, Button, TextField } from '@navikt/ds-react';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import styles from './IdentEndring.module.css';
import Innhold from '../../../components/innhold/Innhold';

const IdentEndring = (): JSX.Element => {
    const [fnr, setFnr] = useState('');
    const [nyttFnr, setNyttFnr] = useState('');

    const setNyttFnrChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setNyttFnr(event.target.value);
    };

    const setFnrChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setFnr(event.target.value);
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        setNyttFnr(nyttFnr);
        setFnr(fnr);

        // TODO also send to backend api to backend api https://macgyver.dev.intern.nav.no/api/v1/docs/#/Identendring/endreBrukerFnr
    };

    return (
        <Innhold>
            <BodyShort>
                Endrer fnr for et gitt fnr i alle sykmeldinger i SyfoSmRegister og oppdaterer aktive NL-koblinger
            </BodyShort>
            <form onSubmit={submitHandler} className={styles.form}>
                <TextField label="fnr" size="medium" onChange={setFnrChangeHandler} />
                <TextField label="nyttFnr" size="medium" onChange={setNyttFnrChangeHandler} />
                <Button variant="primary" size="medium" className={styles.button}>
                    Endre
                </Button>
            </form>
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

export default IdentEndring;
