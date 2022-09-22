import { ChangeEvent, FormEvent, useState } from 'react';
import { BodyShort, Button, TextField } from '@navikt/ds-react';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import styles from '../../../styles/Forms.module.css';

const EndretBehandletdato = (): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState('');
    const [behandletDato, setBehandletDato] = useState('');

    const setSykmeldingIdHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setSykmeldingId(event.target.value);
    };

    const setBehandletDatoHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setBehandletDato(event.target.value);
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setSykmeldingId(sykmeldingId);
        setBehandletDato(behandletDato);

        //TODO also send to backend api
    };

    return (
        <div className={styles.innhold}>
            <BodyShort>Endre behandletdato ein papir sykmelding</BodyShort>
            <form onSubmit={submitHandler} className={styles.form}>
                <TextField label="sykmeldingId" size="medium" onChange={setSykmeldingIdHandler} />
                <TextField label="behandletDato" size="medium" onChange={setBehandletDatoHandler} />
                <Button variant="primary" size="medium" className={styles.button}>
                    Endre
                </Button>
            </form>
        </div>
    );
};
export const getServerSideProps = withAuthenticatedPage();

export default EndretBehandletdato;
