import React, { useState } from 'react';
import { Button, TextField } from '@navikt/ds-react';

import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

import styles from './FerdigstillSmregForm.module.css';

interface FerdigstillSmregFormProps {
    onChange: (journalpostId: string, ferdigstiltAv: string) => void;
}

const FerdigstillSmregForm = ({ onChange }: FerdigstillSmregFormProps): JSX.Element => {
    const [journalpostId, setJournalpostId] = useState<string>('');
    const [ferdigstiltAv, setFerdigstiltAv] = useState<string>('');
    const [conformationModalOpen, setConformationModalOpen] = useState(false);

    return (
        <div>
            <TextField
                name="journalpostId"
                label="journalpostId"
                size="medium"
                onChange={(event) => {
                    setJournalpostId(event.currentTarget.value);
                }}
            />
            <TextField
                name="ferdigstiltAv"
                label="ferdigstiltAv (din ident, f.eks. A123456)"
                size="medium"
                onChange={(event) => {
                    setFerdigstiltAv(event.currentTarget.value);
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
                Ferdigstill
            </Button>
            <ConfirmationModal
                message={`Er du sikker på at du vil ferdigstille smregistreringsoppgave med journalpostId: ${journalpostId}`}
                onCancel={() => {
                    setConformationModalOpen(false);
                }}
                onOK={() => {
                    onChange(journalpostId, ferdigstiltAv);
                    setConformationModalOpen(false);
                }}
                open={conformationModalOpen}
            ></ConfirmationModal>
        </div>
    );
};

export default FerdigstillSmregForm;
