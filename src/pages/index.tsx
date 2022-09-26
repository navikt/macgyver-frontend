import type { NextPage } from 'next';
import Head from 'next/head';
import { Print } from '@navikt/ds-icons';
import { Bandage } from '@navikt/ds-icons';
import { Copy } from '@navikt/ds-icons';
import { Employer } from '@navikt/ds-icons';
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
                    <Bandage /> Sykmelding
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/sykmelding/identEndring/IdentEndring" passHref>
                            <DsLink>Endre fnr for en gitt sykmelding</DsLink>
                        </Link>
                    </li>
                    <li>
                        <Link href="/sykmelding/slettSykmelding/SlettSykmelding" passHref>
                            <DsLink>Slett en gitt sykmelding</DsLink>
                        </Link>
                    </li>
                    <li>
                        <Link href="/sykmelding/diagnoseEndring/DiagnoseEndring" passHref>
                            <DsLink>Endre diagnose for en gitt sykmelding</DsLink>
                        </Link>
                    </li>
                    <li>
                        <Link href="/sykmelding/biDiagnoseEndring/BiDiagnoseEndring" passHref>
                            <DsLink> Endre Bi-diagnose for en gitt sykmelding</DsLink>
                        </Link>
                    </li>
                </ul>
            </div>
            <div>
                <h1>
                    <Print /> Papirsykmelding
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/papirsykmelding/endreBehandletdato/EndreBehandletdato" passHref>
                            <DsLink>Endre behandletdato for en gitt papir sykmelding </DsLink>
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <h1>
                    <Copy /> Oppgave
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/oppgave/hentListeAvOppgaver/HentListeAvOppgaver" passHref>
                            <DsLink>Hent liste av oppgaver </DsLink>
                        </Link>
                    </li>
                </ul>
            </div>

            <div>
                <h1>
                    <Employer /> Narmesteleder
                </h1>
                <ul className={styles.list}>
                    <li>
                        <Link href="/narmesteleder/nyNLrequestAltinn/NyNLRequestAltinn" passHref>
                            <DsLink>Sender ny NL-request til altinn</DsLink>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export const getServerSideProps = withAuthenticatedPage();

export default Home;
