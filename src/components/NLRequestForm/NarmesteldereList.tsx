import React, { ReactElement } from 'react'

import { Alert } from '../ds/ds-react'
import { Narmesteldere } from '../../types/narmesteldere'

import NarmesteldereListItem from './NarmesteldereListItem'

interface NarmesteldereListProps {
    narmesteldere: Narmesteldere
}

const NarmesteldereList = ({ narmesteldere }: NarmesteldereListProps): ReactElement => {
    return (
        <Alert key={narmesteldere.fnr} className="items-start" variant="success">
            <ul>
                {Object.entries(narmesteldere).map(([key, value]) => (
                    <NarmesteldereListItem key={narmesteldere.fnr + key} narmesteldereKey={key} value={value} />
                ))}
            </ul>
        </Alert>
    )
}

export default NarmesteldereList
