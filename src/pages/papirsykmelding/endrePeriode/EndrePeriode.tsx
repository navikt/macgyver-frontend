import {ChangeEvent, FormEvent, useState} from "react"
import {Button} from "@navikt/ds-react";
import {Header} from "@navikt/ds-react-internal";
import "@navikt/ds-css";
import "@navikt/ds-css-internal";


const EndrePeriode = () => {


    const [sykmeldingId, setSykmeldingId] = useState("")

    const setSykmeldingIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSykmeldingId(event.target.value)
    }

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSykmeldingId(sykmeldingId)

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
            <p>Endre periode for ein papir sykmelding</p>
            <form onSubmit={submitHandler}>
                <div>
                    <label>sykmeldingId</label>
                    <input type="text" onChange={setSykmeldingIdHandler}/>
                </div>
                <Button variant="primary" size="medium">
                    Endre
                </Button>
            </form>
        </div>
    )
}


export default EndrePeriode