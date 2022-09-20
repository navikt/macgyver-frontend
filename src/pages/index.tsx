import type {NextPage} from 'next'
import Head from 'next/head'

import "@navikt/ds-css";
import "@navikt/ds-css-internal";
import {Header} from "@navikt/ds-react-internal";
import {Link} from "@navikt/ds-react";
import {Print} from "@navikt/ds-icons";
import { Bandage } from "@navikt/ds-icons";
import {Copy} from "@navikt/ds-icons";
import {Employer} from "@navikt/ds-icons";


const Home: NextPage = () => {
    // TODO need to swap out "Ola Normann" with loggedin user name, based on token claims
    return (
        <div>
            <Header>
                <Header.Title as="h1">Macgyver</Header.Title>
                <Header.User name="Ola Normann"/>
            </Header>
            <Head>
                <title>Macgyver</title>
                <meta name="description" content="macgyver"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div>
                <h1><Bandage/> Sykmelding</h1>
                <ul>
                    <li>
                        <Link href="/sykmelding/identEndring/IdentEndring">Endre fnr for en gitt sykmelding</Link>
                    </li>
                    <li>
                        <Link href="/sykmelding/slettSykmelding/SlettSykmelding">Slett en gitt sykmelding</Link>
                    </li>
                    <li>
                        <Link href="/sykmelding/diagnoseEndring/DiagnoseEndring">Endre diagnose for en gitt
                            sykmelding</Link>
                    </li>
                    <li>
                        <Link href="/sykmelding/biDiagnoseEndring/BiDiagnoseEndring">Endre Bi-diagnose for en gitt
                            sykmelding</Link>
                    </li>
                </ul>
            </div>
            <div>
                <h1><Print/> Papirsykmelding</h1>
                <ul>
                    <li>
                        <Link href="/papirsykmelding/endreBehandletdato/EndreBehandletdato">Endre behandletdato for en
                            gitt papir sykmelding</Link>
                    </li>
                </ul>
            </div>

            <div>
                <h1><Copy/> Oppgave</h1>
                <ul>
                    <li>
                        <Link href="/oppgave/hentListeAvOppgaver/HentListeAvOppgaver">Hent liste av oppgaver</Link>
                    </li>
                </ul>
            </div>

            <div>
                <h1><Employer/> Narmesteleder</h1>
                <ul>
                    <li>
                        <Link href="/narmesteleder/nyNLrequestAltinn/NyNLRequestAltinn">Sender ny NL-request til
                            altinn</Link>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Home
