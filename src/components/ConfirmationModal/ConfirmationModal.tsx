import React from 'react'
import { BodyLong, Button, Modal } from '@navikt/ds-react'

import styles from './ConfirmationModal.module.css'

interface ConfirmationModalProps {
    open: boolean
    message: string
    onCancel: () => void
    onOK: () => void
}

const ConfirmationModal = ({ open, message, onCancel, onOK }: ConfirmationModalProps): JSX.Element => {
    return (
        <Modal
            shouldCloseOnOverlayClick={false}
            open={open}
            aria-label="Modal demo"
            onClose={onCancel}
            closeButton={false}
        >
            <Modal.Content>
                <BodyLong spacing>{message}</BodyLong>
                <Button className={styles.button} variant="danger" onClick={onOK}>
                    Ja eg er sikker
                </Button>
                <Button className={styles.button} variant="secondary" onClick={onCancel}>
                    Nei
                </Button>
            </Modal.Content>
        </Modal>
    )
}

export default ConfirmationModal
