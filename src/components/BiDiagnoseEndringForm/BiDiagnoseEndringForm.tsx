import React, { useState } from 'react';
import { Button, TextField } from '@navikt/ds-react';

import styles from '../BiDiagnoseEndringForm/BiDiagnoseEndringForm.module.css';

interface BiDiagnoseEndringFormProps {
    onChange: (kode: string, system: string, sykmeldingId: string) => void;
}

const BiDiagnoseEndringForm = ({ onChange }: BiDiagnoseEndringFormProps): JSX.Element => {
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
                label="kode, eks Z09"
                size="medium"
                onChange={(event) => {
                    setKode(event.currentTarget.value);
                }}
            />
            <TextField
                label="system eks: ICD10 eller ICPC2"
                size="medium"
                onChange={(event) => {
                    setSystem(event.currentTarget.value);
                }}
            />
            <TextField
                label="sykmeldingId, eks 5afaef5d-34ac-4dc5-909f-78c1d82dbf69"
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

export default BiDiagnoseEndringForm;
