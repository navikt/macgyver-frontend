import { ChangeEvent, FormEvent, useState } from 'react';
import { Button, TextField, BodyShort } from '@navikt/ds-react';

import '@navikt/ds-css';
import '@navikt/ds-css-internal';
import { withAuthenticatedPage } from '../../../auth/withAuth';
import styles from '../../../styles/Forms.module.css';

const NyNLRequestAltinn = (): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState('');
    const [fnr, setFnr] = useState('');
    const [orgnummer, setOrgnummer] = useState('');

    const setSykmeldingIdHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setSykmeldingId(event.target.value);
    };

    const setFnrHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setFnr(event.target.value);
    };

    const setOrgnummerHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setOrgnummer(event.target.value);
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setSykmeldingId(sykmeldingId);
        setFnr(fnr);
        setOrgnummer(orgnummer);
        //TODO also send to backend api
    };

    return (
        <div className={styles.innhold}>
            <BodyShort>Sender ny NL-request til altinn</BodyShort>
            <form onSubmit={submitHandler}>
                <TextField label="sykmeldingId" size="medium" onChange={setSykmeldingIdHandler} />
                <TextField label="fnr" size="medium" onChange={setFnrHandler} />
                <TextField label="orgnummer" size="medium" onChange={setOrgnummerHandler} />
                <Button variant="primary" size="medium" className={styles.button}>
                    Send
                </Button>
            </form>
        </div>
    );
};
export const getServerSideProps = withAuthenticatedPage();

export default NyNLRequestAltinn;
