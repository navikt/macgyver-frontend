import React from 'react';
import { BodyLong, Button, Modal } from '@navikt/ds-react';

interface ConfirmationModalProps {
    open: boolean;
    message: string;
    onCancel: () => void;
    onOK: () => void;
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
                <Button variant={'danger'} onClick={onOK}>
                    Ja eg er sikker
                </Button>
                <Button variant={'secondary'} onClick={onCancel}>
                    Nei
                </Button>
            </Modal.Content>
        </Modal>
    );
};

export default ConfirmationModal;
