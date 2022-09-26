import React, { useState } from 'react';
import { Button, TextField } from '@navikt/ds-react';
import styles from './NyNLRequestAltinnForm.module.css';

interface NyNlRequestAltinnFormProps {
    onChange: (sykmeldingId: string, fnr: string, orgnummer: string) => void;
}

const NyNlRequestAltinnForm = ({ onChange }: NyNlRequestAltinnFormProps): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState<string>('');
    const [fnr, setFnr] = useState('');
    const [orgnummer, setOrgnummer] = useState('');

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        onChange(sykmeldingId, fnr, orgnummer);
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
            <TextField
                label="fnr"
                size="medium"
                onChange={(event) => {
                    setFnr(event.currentTarget.value);
                }}
            />
            <TextField
                label="orgnummer"
                size="medium"
                onChange={(event) => {
                    setOrgnummer(event.currentTarget.value);
                }}
            />
            <Button variant="primary" size="medium" className={styles.button} onClick={handleClick}>
                Send
            </Button>
        </div>
    );
};

export default NyNlRequestAltinnForm;
