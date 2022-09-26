import React, { useState } from 'react';
import { Button, TextField } from '@navikt/ds-react';
import styles from './SlettSykmeldingForm.module.css';

interface SlettSykmeldingFormProps {
    onChange: (sykmeldingId: string) => void;
}

const SlettSykmeldingForm = ({ onChange }: SlettSykmeldingFormProps): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState<string>('');

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        onChange(sykmeldingId);
    };

    return (
        <div>
            <TextField
                name="sykmeldingId"
                label="sykmeldingId"
                size="medium"
                onChange={(event) => {
                    setSykmeldingId(event.currentTarget.value);
                }}
            />
            <Button variant="primary" size="medium" className={styles.button} onClick={handleClick}>
                Slett
            </Button>
        </div>
    );
};

export default SlettSykmeldingForm;
