import {ChangeEvent, FormEvent, useState} from "react"
import {Button} from "@navikt/ds-react";
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
            <p>Endre Bi-diagnose for sykmelding</p>
            <form onSubmit={submitHandler}>
                <div>
                    <label>sykmeldingId</label>
                    <input type="text" onChange={setSykmeldingIdHandler}/>
                </div>
                <div>
                    <label>kode</label>
                    <input type="text" onChange={setKodeHandler}/>
                </div>
                <div>
                    <label>system</label>
                    <input type="text" onChange={setSystemHandler}/>
                </div>
                <Button variant="primary" size="medium">
                    Endre
                </Button>
            </form>
        </div>
    )
}

export default BiDiagnoseEndring