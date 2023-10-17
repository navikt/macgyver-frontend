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

import styles from './Menu.module.css'

function Menu(): ReactElement {
    return (
        <div className={styles.innhold}>
            <div>
                <h1>
                    <PersonGroupIcon /> IdentEndring
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/ident-endring">Endre fnr for en gitt sykmelding</Link>
                    </li>
                </ul>
            </div>
            <div>
                <h1>
                    <BandageIcon /> Sykmelding
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/slett-sykmelding">Slett en gitt sykmelding</Link>
                    </li>
                </ul>
            </div>
            <div>
                <h1>
                    <FilesIcon /> Oppgave
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/hent-oppgaver">Hent liste av oppgaver</Link>
                    </li>
                </ul>
            </div>

            <div>
                <h1>
                    <ReceptionIcon /> Narmesteleder
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/ny-naermeste-leder">Sender ny NL-request til altinn</Link>
                    </li>
                    <li>
                        <Link href="/hent-naermeste-ledere">Hent narmesteldere for ein sykmeldt person</Link>
                    </li>
                </ul>
            </div>

            <div>
                <h1>
                    <StethoscopeIcon /> Legeerklæring
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/slett-legeerklaering">Slett en gitt legeerklæring</Link>
                    </li>
                </ul>
            </div>

            <div>
                <h1>
                    <FilePdfIcon /> Journalpost
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/hent-journalposter">Hent liste av journalposter</Link>
                    </li>
                </ul>
            </div>
            <div>
                <h1>
                    <PersonIcon /> Person
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/hent-person">Hent navn på person og liste med identer</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Menu
