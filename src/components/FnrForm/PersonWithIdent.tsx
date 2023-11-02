import React, { ReactElement } from 'react'

import { Alert } from '../ds/ds-react'
import { Person } from '../../types/person'

import PersonItem from './PersonItem'

interface PersonWithIdentProps {
    person: Person
}

const PersonWithIdent = ({ person }: PersonWithIdentProps): ReactElement => {
    return (
        <Alert className="min-[700px]:max-w-[50%]" variant="success">
            <ul className="[&>li:nth-child(2)]:mb-6">
                <PersonItem personIdentKey="fnr" value={person.fnr} />
                <PersonItem personIdentKey="navn" value={person.navn} />
                {person.identer.map((ident) =>
                    Object.entries(ident).map(([key, value]) => (
                        <PersonItem key={ident.ident + key} personIdentKey={key} value={value} />
                    )),
                )}
            </ul>
        </Alert>
    )
}

export default PersonWithIdent
