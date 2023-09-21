import React, { useState } from 'react'
import { Button, TextField } from '@navikt/ds-react'

import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

import styles from './SlettSykmeldingForm.module.css'

interface SlettSykmeldingFormProps {
    onSubmit: (sykmeldingId: string) => void
}

const SlettSykmeldingForm = ({ onSubmit }: SlettSykmeldingFormProps): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState<string>('')
    const [conformationModalOpen, setConformationModalOpen] = useState(false)

    return (
        <div>
            <TextField
                name="sykmeldingId"
                label="sykmeldingId"
                size="medium"
                onChange={(event) => {
                    setSykmeldingId(event.currentTarget.value)
                }}
            />
            <Button
                variant="primary"
                size="medium"
                className={styles.button}
                onClick={() => {
                    setConformationModalOpen(true)
                }}
            >
                Slett
            </Button>
            <ConfirmationModal
                message={`Er du sikker på at du vil slette sykmelding med id: ${sykmeldingId}`}
                onCancel={() => {
                    setConformationModalOpen(false)
                }}
                onOK={() => {
                    onSubmit(sykmeldingId)
                    setConformationModalOpen(false)
                }}
                open={conformationModalOpen}
            ></ConfirmationModal>
        </div>
    )
}

export default SlettSykmeldingForm
