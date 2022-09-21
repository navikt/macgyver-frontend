import { ChangeEvent, FormEvent, useState } from 'react';
import { BodyShort, Button, TextField } from '@navikt/ds-react';

import '@navikt/ds-css';
import '@navikt/ds-css-internal';
import { withAuthenticatedPage } from '../../../auth/withAuth';
import styles from '../../../styles/Forms.module.css';

const DiagnoseEndring = (): JSX.Element => {
    const [kode, setKode] = useState('');
    const [system, setSystem] = useState('');

    const [sykmeldingId, setSykmeldingId] = useState('');

    const setSykmeldingIdHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setSykmeldingId(event.target.value);
    };

    const setKodeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setKode(event.target.value);
    };

    const setSystemHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setSystem(event.target.value);
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setSykmeldingId(sykmeldingId);
        setKode(kode);
        setSystem(system);

        //TODO also send to backend api
    };

    return (
        <div className={styles.innhold}>
            <BodyShort>Endre diagnose for sykmelding</BodyShort>
            <form onSubmit={submitHandler}>
                <TextField label="sykmeldingId" size="medium" onChange={setSykmeldingIdHandler} />
                <TextField label="kode" size="medium" onChange={setKodeHandler} />
                <TextField label="system" size="medium" onChange={setSystemHandler} />
                <Button variant="primary" size="medium" className={styles.button}>
                    Endre
                </Button>
            </form>
        </div>
    );
};
export const getServerSideProps = withAuthenticatedPage();

export default DiagnoseEndring;
