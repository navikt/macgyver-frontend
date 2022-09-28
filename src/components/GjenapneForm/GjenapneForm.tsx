import React, { useState } from 'react';
import { Button, TextField } from '@navikt/ds-react';

import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

import styles from './GjenapneForm.module.css';

interface GjenapneFormProps {
    onChange: (sykmeldingId: string) => void;
}

const GjenapneForm = ({ onChange }: GjenapneFormProps): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState<string>('');
    const [conformationModalOpen, setConformationModalOpen] = useState(false);

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
            <Button
                variant="primary"
                size="medium"
                className={styles.button}
                onClick={() => {
                    setConformationModalOpen(true);
                }}
            >
                Gjenåpne
            </Button>
            <ConfirmationModal
                message={`Er du sikker på at du vil gjenåpne sykmelding med id: ${sykmeldingId}`}
                onCancel={() => {
                    setConformationModalOpen(false);
                }}
                onOK={() => {
                    onChange(sykmeldingId);
                    setConformationModalOpen(false);
                }}
                open={conformationModalOpen}
            ></ConfirmationModal>
        </div>
    );
};

export default GjenapneForm;
