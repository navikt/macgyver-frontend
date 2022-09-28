import React, { useState } from 'react';
import { Button, TextField } from '@navikt/ds-react';

import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

import styles from './DiagnoseEndringForm.module.css';

interface DiagnoseEndringFormProps {
    onChange: (kode: string, system: string, sykmeldingId: string) => void;
}

const DiagnoseEndringForm = ({ onChange }: DiagnoseEndringFormProps): JSX.Element => {
    const [kode, setKode] = useState('');
    const [system, setSystem] = useState('');
    const [sykmeldingId, setSykmeldingId] = useState('');

    const [conformationModalOpen, setConformationModalOpen] = useState(false);

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
                message={`Er du sikker på at du vil endre houved diagnose for sykmelding med id: ${sykmeldingId}`}
                onCancel={() => {
                    setConformationModalOpen(false);
                }}
                onOK={() => {
                    onChange(kode, system, sykmeldingId);
                    setConformationModalOpen(false);
                }}
                open={conformationModalOpen}
            ></ConfirmationModal>
        </div>
    );
};

export default DiagnoseEndringForm;
