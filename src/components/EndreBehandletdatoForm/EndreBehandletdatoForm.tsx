import React, { useState } from 'react';
import { Button, TextField } from '@navikt/ds-react';

import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

import styles from './EndreBehandletdatoForm.module.css';

interface EndreBehandletdatoFormProps {
    onChange: (sykmeldingId: string, behandletDato: string) => void;
}

const EndreBehandletdatoForm = ({ onChange }: EndreBehandletdatoFormProps): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState('');
    const [behandletDato, setBehandletDato] = useState('');

    const [conformationModalOpen, setConformationModalOpen] = useState(false);

    return (
        <div>
            <TextField
                label="sykmeldingId, eks 5afaef5d-34ac-4dc5-909f-78c1d82dbf69"
                size="medium"
                onChange={(event) => {
                    setSykmeldingId(event.currentTarget.value);
                }}
            />
            <TextField
                label="behandletDato, eks 2022-09-19"
                size="medium"
                onChange={(event) => {
                    setBehandletDato(event.currentTarget.value);
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
                message={`Er du sikker på at du vil endre behandletDato for papir sykmelding med id: ${sykmeldingId}`}
                onCancel={() => {
                    setConformationModalOpen(false);
                }}
                onOK={() => {
                    onChange(behandletDato, sykmeldingId);
                    setConformationModalOpen(false);
                }}
                open={conformationModalOpen}
            ></ConfirmationModal>
        </div>
    );
};

export default EndreBehandletdatoForm;
