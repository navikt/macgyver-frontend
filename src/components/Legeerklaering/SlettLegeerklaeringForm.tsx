import React, { useState } from 'react'
import { Button, TextField } from '@navikt/ds-react'

import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

import styles from './SlettLegeerklaeringForm.module.css'

interface SlettLegeerklaeringFormProps {
    onSubmit: (legeerklaeringId: string) => void
}

const SlettLegeerklaeringForm = ({ onSubmit }: SlettLegeerklaeringFormProps): JSX.Element => {
    const [legeerklaeringId, setlegeerklaeringId] = useState<string>('')
    const [conformationModalOpen, setConformationModalOpen] = useState(false)

    return (
        <div>
            <TextField
                name="legeerklaeringId"
                label="legeerklaeringId"
                size="medium"
                onChange={(event) => {
                    setlegeerklaeringId(event.currentTarget.value)
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
                message={`Er du sikker på at du vil slette legeerklaeringId med id: ${legeerklaeringId}`}
                onCancel={() => {
                    setConformationModalOpen(false)
                }}
                onOK={() => {
                    onSubmit(legeerklaeringId)
                    setConformationModalOpen(false)
                }}
                open={conformationModalOpen}
            ></ConfirmationModal>
        </div>
    )
}

export default SlettLegeerklaeringForm
