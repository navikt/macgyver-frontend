import {ChangeEvent, FormEvent, useState} from "react"
import {BodyShort, Button, TextField} from "@navikt/ds-react";
import {Header} from "@navikt/ds-react-internal";
import "@navikt/ds-css";
import "@navikt/ds-css-internal";


const BiDiagnoseEndring = () => {

    const [kode, setKode] = useState("")
    const [system, setSystem] = useState("")

    const [sykmeldingId, setSykmeldingId] = useState("")

    const setSykmeldingIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSykmeldingId(event.target.value)
    }

    const setKodeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setKode(event.target.value)
    }

    const setSystemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSystem(event.target.value)
    }

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSykmeldingId(sykmeldingId)
        setKode(kode)
        setSystem(system)

        //TODO also send to backend api
    }

    // TODO need to swap out "Ola Normann" with loggedin user name, based on token claims
    return (
        <div>
            <Header>
                <Header.Title as="h1">Macgyver</Header.Title>
                <Header.User name="Ola Normann"/>
            </Header>
            <BodyShort>Endre Bi-diagnose for sykmelding</BodyShort>
            <form onSubmit={submitHandler}>
                <TextField label="sykmeldingId" size="medium" onChange={setSykmeldingIdHandler}/>
                <TextField label="kode" size="medium" onChange={setKodeHandler}/>
                <TextField label="system" size="medium" onChange={setSystemHandler}/>
                <Button variant="primary" size="medium">Endre</Button>
            </form>
        </div>
    )
}

export default BiDiagnoseEndring