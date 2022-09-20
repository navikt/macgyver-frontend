import { ChangeEvent, FormEvent, useState } from 'react';
import { BodyShort, Button, TextField } from '@navikt/ds-react';

import '@navikt/ds-css';
import '@navikt/ds-css-internal';
import { withAuthenticatedPage } from '../../../auth/withAuth';

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
        <div>
            <BodyShort>Endre behandletdato ein papir sykmelding</BodyShort>
            <form onSubmit={submitHandler}>
                <TextField label="sykmeldingId" size="medium" onChange={setSykmeldingIdHandler} />
                <TextField label="behandletDato" size="medium" onChange={setBehandletDatoHandler} />
                <Button variant="primary" size="medium">
                    Endre
                </Button>
            </form>
        </div>
    );
};
export const getServerSideProps = withAuthenticatedPage();

export default EndretBehandletdato;
