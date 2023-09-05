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
import { Link as DsLink } from '@navikt/ds-react';

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
                        <Link href="/identEndring/sykmeldt/IdentEndringSykmeldt" passHref>
                            <DsLink>Endre fnr for en gitt sykmelding</DsLink>
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
                        <Link href="/sykmelding/gjenapne/Gjenapne" passHref>
                            <DsLink>Gjenåpne sykmelding med gitt sykmeldingId</DsLink>
                        </Link>
                    </li>
                    <li>
                        <Link href="/sykmelding/slettSykmelding/SlettSykmelding" passHref>
                            <DsLink>Slett en gitt sykmelding</DsLink>
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
                        <Link href="/oppgave/hentListeAvOppgaver/HentListeAvOppgaver" passHref>
                            <DsLink>Hent liste av oppgaver </DsLink>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/oppgave/ferdigstillSmregistreringOppgave/FerdigstillSmregistreringOppgave"
                            passHref
                        >
                            <DsLink>Ferdigstill smregistreringsoppgave </DsLink>
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
                        <Link href="/narmesteleder/nyNLrequestAltinn/NyNLRequestAltinn" passHref>
                            <DsLink>Sender ny NL-request til altinn</DsLink>
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
                        <Link href="/legeerklaring/slettLegeerklaring/SlettLegeerklaring" passHref>
                            <DsLink>Slett en gitt legeerklaring</DsLink>
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
                        <Link href="/journalpost/hentListeAvJournalposter/HentListeAvJouranlposter" passHref>
                            <DsLink>Hent liste av journalposter </DsLink>
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
                        <Link href="/person/hentPerson/HentPerson" passHref>
                            <DsLink>Hent navn på person og liste med identer</DsLink>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export const getServerSideProps = withAuthenticatedPage();

export default Home;
