import React, { ReactElement, useState } from 'react'
import { Button, TextField } from '@navikt/ds-react'

import styles from './OppgaveIdForm.module.css'

interface OppgaveIdFormProps {
    onChange: (oppgaveIder: number[]) => void
}

const OppgaveIdForm = ({ onChange }: OppgaveIdFormProps): ReactElement => {
    const [oppgaveIder, setOppgaveIder] = useState('')

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        onChange(oppgaveIder.split(',').map(Number))
    }

    return (
        <div>
            <TextField
                name="oppgaveider"
                label="oppgaveider"
                size="medium"
                onChange={(event) => {
                    setOppgaveIder(event.currentTarget.value)
                }}
            />
            <Button name="hentButton" variant="primary" size="medium" className={styles.button} onClick={handleClick}>
                Hent
            </Button>
        </div>
    )
}

export default OppgaveIdForm
