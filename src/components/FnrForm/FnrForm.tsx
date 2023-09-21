import React, { useState } from 'react'
import { Button, TextField } from '@navikt/ds-react'

import styles from './FnrForm.module.css'

interface FnrFormProps {
    onChange: (fnr: string) => void
}

const FnrForm = ({ onChange }: FnrFormProps): JSX.Element => {
    const [fnr, setFnr] = useState('')

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        onChange(fnr)
    }

    return (
        <div>
            <TextField
                name="fnr"
                label="fnr"
                size="medium"
                onChange={(event) => {
                    setFnr(event.currentTarget.value)
                }}
            />
            <Button name="hentButton" variant="primary" size="medium" className={styles.button} onClick={handleClick}>
                Hent
            </Button>
        </div>
    )
}

export default FnrForm
