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
                label="sykmeldingId"
                size="medium"
                onChange={(event) => {
                    setSykmeldingId(event.currentTarget.value);
                }}
            />
            <TextField
                label="behandletDato"
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
