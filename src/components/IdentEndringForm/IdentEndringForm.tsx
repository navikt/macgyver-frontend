import React, { useState } from 'react';
import { Button, TextField } from '@navikt/ds-react';
import styles from './IdentEndringForm.module.css';

interface IdentEndringFormProps {
    onChange: (fnr: string, nyttFnr: string) => void;
}

const IdentEndringForm = ({ onChange }: IdentEndringFormProps): JSX.Element => {
    const [fnr, setFnr] = useState('');
    const [nyttFnr, setNyttFnr] = useState('');

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        onChange(fnr, nyttFnr);
    };

    return (
        <div>
            <TextField
                label="fnr"
                size="medium"
                onChange={(event) => {
                    setFnr(event.currentTarget.value);
                }}
            />
            <TextField
                label="nyttFnr"
                size="medium"
                onChange={(event) => {
                    setNyttFnr(event.currentTarget.value);
                }}
            />
            <Button variant="primary" size="medium" className={styles.button} onClick={handleClick}>
                Endre
            </Button>
        </div>
    );
};

export default IdentEndringForm;
