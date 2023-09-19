import type { NextPage } from 'next';
import Head from 'next/head';
import { BandageIcon } from '@navikt/aksel-icons';
import { FilesIcon } from '@navikt/aksel-icons';
import { FilePdfIcon } from '@navikt/aksel-icons';
import { ReceptionIcon } from '@navikt/aksel-icons';
import { PersonGroupIcon } from '@navikt/aksel-icons';
import { StethoscopeIcon } from '@navikt/aksel-icons';
import { PersonIcon } from '@navikt/aksel-icons';
import Link from 'next/link';

import { withAuthenticatedPage } from '../auth/withAuth';
import styles from '../styles/App.module.css';

const Home: NextPage = () => {
    return (
        <div className={styles.innhold}>
            <Head>
                <title>Macgyver</title>
                <meta name="description" content="macgyver" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <h1>
                    <PersonGroupIcon /> IdentEndring
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/identEndring/identEndringSykmeldt" passHref>
                            Endre fnr for en gitt sykmelding
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h1>
                    <BandageIcon /> Sykmelding
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/sykmelding/slettSykmelding" passHref>
                            Slett en gitt sykmelding
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h1>
                    <FilesIcon /> Oppgave
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/oppgave/hentListeAvOppgaver" passHref>
                            Hent liste av oppgaver
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <h1>
                    <ReceptionIcon /> Narmesteleder
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/narmesteleder/nyNLRequestAltinn" passHref>
                            Sender ny NL-request til altinn
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <h1>
                    <StethoscopeIcon /> Legeerklæring
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/legeerklaring/slettLegeerklaring" passHref>
                            Slett en gitt legeerklaring
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <h1>
                    <FilePdfIcon /> Journalpost
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/journalpost/hentListeAvJouranlposter" passHref>
                            Hent liste av journalposter
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h1>
                    <PersonIcon /> Person
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/person/hentPerson" passHref>
                            Hent navn på person og liste med identer
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export const getServerSideProps = withAuthenticatedPage();

export default Home;
