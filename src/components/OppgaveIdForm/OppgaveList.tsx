import React, { ReactElement } from 'react'

import { Oppgave } from '../../types/oppgaver'
import { Alert } from '../ds/ds-react'

import OppgaveListItem from './OppgaveListItem'

interface OppgaveListProps {
    oppgave: Oppgave
}

const OppgaveList = ({ oppgave }: OppgaveListProps): ReactElement => {
    return (
        <Alert key={oppgave.id} className="items-start max-w-[45%]" variant="success">
            <ul>
                {Object.entries(oppgave).map(([key, value]) => (
                    <OppgaveListItem key={oppgave.id + key} oppgaveKey={key} value={value} />
                ))}
            </ul>
        </Alert>
    )
}

export default OppgaveList
