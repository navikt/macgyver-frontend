import React, { ReactElement } from 'react'

import { BodyShort } from '../ds/ds-react'

interface NarmesteldereListProps {
    narmesteldereKey: string
    value: string | number | boolean | null
}

const NarmesteldereListItem = ({ narmesteldereKey, value }: NarmesteldereListProps): ReactElement => {
    const val: string | number | null = typeof value == 'boolean' ? String(value) : value
    return (
        <li className="flex border-b border-gray-600 py-1 max-[1130px]:flex-col">
            <BodyShort className="min-w-[18rem] font-bold">{narmesteldereKey}: </BodyShort>
            <BodyShort>{val}</BodyShort>
        </li>
    )
}

export default NarmesteldereListItem
