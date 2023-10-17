import React, { useState } from 'react'
import { Button, TextField } from '@navikt/ds-react'

import styles from './NLRequestForm.module.css'

interface NyNlRequestAltinnFormProps {
    onChange: (sykmeldteFnr: string) => void
}

const NLRequestForm = ({ onChange }: NyNlRequestAltinnFormProps): JSX.Element => {
    const [sykmeldteFnr, setSykmeldteFnr] = useState<string>('')

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault()
        onChange(sykmeldteFnr)
    }
    return (
        <div>
            <TextField
                name="sykmeldteFnr"
                label="sykmeldteFnr"
                size="medium"
                onChange={(event) => {
                    setSykmeldteFnr(event.currentTarget.value)
                }}
            />

            <Button name="hentButton" variant="primary" size="medium" className={styles.button} onClick={handleClick}>
                Hent
            </Button>
        </div>
    )
}

export default NLRequestForm
