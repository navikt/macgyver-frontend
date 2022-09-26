import { ChangeEvent, FormEvent, useState } from 'react';
import { BodyShort, Button, TextField } from '@navikt/ds-react';
import { logger } from '@navikt/next-logger';

import { withAuthenticatedPage } from '../../../auth/withAuth';
import styles from './SlettSykmelding.module.css';
import Innhold from '../../../components/innhold/Innhold';

const SlettSykmelding = (): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState('');

    const setSykmeldingIdHandler = (event: ChangeEvent<HTMLInputElement>): void => {
        setSykmeldingId(event.target.value);
    };

    const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setSykmeldingId(sykmeldingId);

        delteData();
    };
    const SYKMELDING_URL = `/api/proxy/api/sykmelding`;

    const delteData = async (): Promise<void> => {
        const response = await fetch(`${SYKMELDING_URL}/${sykmeldingId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            logger.info(`Response is OK, message is: ${await response.json()}`);
        } else {
            logger.info(`Response is not OK, message is: ${await response.json()}`);
        }
    };

    return (
        <Innhold>
            <BodyShort>Sletter en sykmelding</BodyShort>
            <form onSubmit={submitHandler} className={styles.form}>
                <TextField label="sykmeldingId" size="medium" onChange={setSykmeldingIdHandler} />
                <Button variant="primary" size="medium" className={styles.button}>
                    Slett
                </Button>
            </form>
        </Innhold>
    );
};
export const getServerSideProps = withAuthenticatedPage();

export default SlettSykmelding;
