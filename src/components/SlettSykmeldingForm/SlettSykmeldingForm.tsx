import React, { useState } from 'react'
import { Button, TextField } from '@navikt/ds-react'

import ConfirmationModal from '../ConfirmationModal/ConfirmationModal'

interface SlettSykmeldingFormProps {
    onSubmit: (sykmeldingId: string, journalpostId: string) => void
}

const SlettSykmeldingForm = ({ onSubmit }: SlettSykmeldingFormProps): JSX.Element => {
    const [sykmeldingId, setSykmeldingId] = useState<string>('')
    const [journalpostId, setJournalpostId] = useState<string>('')
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
                className="my-6 w-96"
            />
            <TextField
                name="journalpostId"
                label="journalpostId"
                size="medium"
                onChange={(event) => {
                    setJournalpostId(event.currentTarget.value)
                }}
            />
            <Button
                variant="primary"
                size="medium"
                className="my-4"
                onClick={() => {
                    setConformationModalOpen(true)
                }}
            >
                Slett
            </Button>
            <ConfirmationModal
                message={`Er du sikker på at du vil slette sykmelding med id: ${sykmeldingId} og journalposten: ${journalpostId} ?`}
                onCancel={() => {
                    setConformationModalOpen(false)
                }}
                onOK={() => {
                    onSubmit(sykmeldingId, journalpostId)
                    setConformationModalOpen(false)
                }}
                open={conformationModalOpen}
            ></ConfirmationModal>
        </div>
    )
}

export default SlettSykmeldingForm
