import React, { useState } from 'react';
import { Button, TextField } from '@navikt/ds-react';
import styles from './DiagnoseEndringForm.module.css';

interface DiagnoseEndringFormProps {
    onChange: (kode: string, system: string, sykmeldingId: string) => void;
}

const DiagnoseEndringForm = ({ onChange }: DiagnoseEndringFormProps): JSX.Element => {
    const [kode, setKode] = useState('');
    const [system, setSystem] = useState('');
    const [sykmeldingId, setSykmeldingId] = useState('');

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        onChange(kode, system, sykmeldingId);
    };

    return (
        <div>
            <TextField
                label="kode"
                size="medium"
                onChange={(event) => {
                    setKode(event.currentTarget.value);
                }}
            />
            <TextField
                label="system"
                size="medium"
                onChange={(event) => {
                    setSystem(event.currentTarget.value);
                }}
            />
            <TextField
                label="sykmeldingId"
                size="medium"
                onChange={(event) => {
                    setSykmeldingId(event.currentTarget.value);
                }}
            />
            <Button variant="primary" size="medium" className={styles.button} onClick={handleClick}>
                Endre
            </Button>
        </div>
    );
};

export default DiagnoseEndringForm;
