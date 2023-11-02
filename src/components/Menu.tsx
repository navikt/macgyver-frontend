'use client'

import { ReactElement } from 'react'
import Link from 'next/link'

import {
    BandageIcon,
    FilesIcon,
    FilePdfIcon,
    ReceptionIcon,
    PersonGroupIcon,
    StethoscopeIcon,
    PersonIcon,
} from '../components/ds/icons'

import MenuItem from './MenuItem'

function Menu(): ReactElement {
    return (
        <div className="mt-10 px-10">
            <MenuItem title="IdentEndring" Icon={PersonGroupIcon}>
                <li>
                    <Link href="/ident-endring">Endre fnr for en gitt sykmelding</Link>
                </li>
            </MenuItem>
            <MenuItem title="Sykmelding" Icon={BandageIcon}>
                <li>
                    <Link href="/slett-sykmelding">Slett en gitt sykmelding</Link>
                </li>
            </MenuItem>
            <MenuItem title="Oppgave" Icon={FilesIcon}>
                <li>
                    <Link href="/hent-oppgaver">Hent oppgaver</Link>
                </li>
            </MenuItem>
            <MenuItem title="Narmesteleder" Icon={ReceptionIcon}>
                <>
                    <li>
                        <Link href="/ny-naermeste-leder">Sender ny NL-request til altinn</Link>
                    </li>
                    <li>
                        <Link href="/hent-naermeste-ledere">Hent narmesteldere for ein sykmeldt person</Link>
                    </li>
                </>
            </MenuItem>
            <MenuItem title="Legeerklæring" Icon={StethoscopeIcon}>
                <li>
                    <Link href="/slett-legeerklaering">Slett en gitt legeerklæring</Link>
                </li>
            </MenuItem>
            <MenuItem title="Journalpost" Icon={FilePdfIcon}>
                <li>
                    <Link href="/hent-journalposter">Hent liste med journalposter</Link>
                </li>
            </MenuItem>
            <MenuItem title="Person" Icon={PersonIcon}>
                <li>
                    <Link href="/hent-person">Hent navn på person og liste med identer</Link>
                </li>
            </MenuItem>
        </div>
    )
}

export default Menu
