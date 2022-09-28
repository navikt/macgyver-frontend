import React, { useState } from 'react';
import { Button, TextField } from '@navikt/ds-react';

import styles from './EndreBehandletdatoForm.module.css';

interface EndreBehandletdatoFormProps {
    onChange: (sykmeldingId: string, behandletDato: string) => void;
}

const EndreBehandletdatoForm = ({ onChange }: EndreBehandletdatoFormProps): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState('');
    const [behandletDato, setBehandletDato] = useState('');

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        onChange(sykmeldingId, behandletDato);
    };

    return (
        <div>
            <TextField
                label="sykmeldingId, eks 5afaef5d-34ac-4dc5-909f-78c1d82dbf69"
                size="medium"
                onChange={(event) => {
                    setSykmeldingId(event.currentTarget.value);
                }}
            />
            <TextField
                label="behandletDato, eks 2022-09-19"
                size="medium"
                onChange={(event) => {
                    setBehandletDato(event.currentTarget.value);
                }}
            />
            <Button variant="primary" size="medium" className={styles.button} onClick={handleClick}>
                Endre
            </Button>
        </div>
    );
};

export default EndreBehandletdatoForm;
