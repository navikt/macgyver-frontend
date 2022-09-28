import React, { useState } from 'react';
import { Button, TextField } from '@navikt/ds-react';

import ConfirmationModal from '../../ConfirmationModal/ConfirmationModal';

import styles from './IdentEndringNarmestelederForm.module.css';

interface IdentEndringNarmestelederFormProps {
    onChange: (fnr: string, nyttFnr: string) => void;
}

const IdentEndringNarmestelederForm = ({ onChange }: IdentEndringNarmestelederFormProps): JSX.Element => {
    const [fnr, setFnr] = useState('');
    const [nyttFnr, setNyttFnr] = useState('');

    const [conformationModalOpen, setConformationModalOpen] = useState(false);

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
            <Button
                variant="primary"
                size="medium"
                className={styles.button}
                onClick={() => {
                    setConformationModalOpen(true);
                }}
            >
                Endre
            </Button>
            <ConfirmationModal
                message={`Er du sikker på at du vil endret fnr for leder`}
                onCancel={() => {
                    setConformationModalOpen(false);
                }}
                onOK={() => {
                    onChange(fnr, nyttFnr);
                    setConformationModalOpen(false);
                }}
                open={conformationModalOpen}
            ></ConfirmationModal>
        </div>
    );
};

export default IdentEndringNarmestelederForm;
