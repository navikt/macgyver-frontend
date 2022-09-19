import {ChangeEvent, FormEvent, useState} from "react"
import {Button} from "@navikt/ds-react";
import {Header} from "@navikt/ds-react-internal";
import "@navikt/ds-css";
import "@navikt/ds-css-internal";


const EndretBehandletdato = () => {


    const [sykmeldingId, setSykmeldingId] = useState("")
    const [behandletDato, setBehandletDato] = useState("")


    const setSykmeldingIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSykmeldingId(event.target.value)
    }

    const setBehandletDatoHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setBehandletDato(event.target.value)
    }

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSykmeldingId(sykmeldingId)
        setBehandletDato(behandletDato)

        //TODO also send to backend api
    }

    // TODO need to swap out "Ola Normann" with loggedin user name, based on token claims
    // TDDO input should be simular to https://github.com/navikt/smregistrering
    return (
        <div>
            <Header>
                <Header.Title as="h1">Macgyver</Header.Title>
                <Header.User name="Ola Normann"/>
            </Header>
            <p>Endre behandletdato ein papir sykmelding</p>
            <form onSubmit={submitHandler}>
                <div>
                    <label>sykmeldingId</label>
                    <input type="text" onChange={setSykmeldingIdHandler}/>
                </div>
                <div>
                    <label>behandletDato</label>
                    <input type="text" onChange={setBehandletDatoHandler}/>
                </div>
                <Button variant="primary" size="medium">
                    Endre
                </Button>
            </form>
        </div>
    )
}


export default EndretBehandletdato