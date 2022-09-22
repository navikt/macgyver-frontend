import { ChangeEvent, FormEvent, useState } from 'react';
import { BodyShort, Button, TextField } from '@navikt/ds-react';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import styles from '../../../styles/Forms.module.css';

const SlettSykmelding = (): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState('');

    const setSykmeldingIdHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setSykmeldingId(event.target.value);
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        setSykmeldingId(sykmeldingId);
        // TODO also send to backend api
    };
    return (
        <div className={styles.innhold}>
            <BodyShort>Sletter en sykmelding</BodyShort>
            <form onSubmit={submitHandler} className={styles.form}>
                <TextField label="sykmeldingId" size="medium" onChange={setSykmeldingIdHandler} />
                <Button variant="primary" size="medium" className={styles.button}>
                    Slett
                </Button>
            </form>
        </div>
    );
};
export const getServerSideProps = withAuthenticatedPage();

export default SlettSykmelding;
