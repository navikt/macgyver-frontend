import React from 'react'
import { BodyLong, Button, Modal } from '@navikt/ds-react'

interface ConfirmationModalProps {
    open: boolean
    message: string
    onCancel: () => void
    onOK: () => void
}

const ConfirmationModal = ({ open, message, onCancel, onOK }: ConfirmationModalProps): JSX.Element => {
    return (
        <Modal open={open} aria-label="Modal demo" onClose={onCancel}>
            <Modal.Body>
                <BodyLong spacing>{message}</BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Nei
                </Button>
                <Button variant="danger" onClick={onOK}>
                    Ja eg er sikker
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal
