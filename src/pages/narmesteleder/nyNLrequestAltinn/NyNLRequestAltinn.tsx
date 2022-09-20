import {ChangeEvent, FormEvent, useState} from "react"
import {Button, TextField, BodyShort} from "@navikt/ds-react";
import {Header} from "@navikt/ds-react-internal";
import "@navikt/ds-css";
import "@navikt/ds-css-internal";


const NyNLRequestAltinn = () => {


    const [sykmeldingId, setSykmeldingId] = useState("")
    const [fnr, setFnr] = useState("")
    const [orgnummer, setOrgnummer] = useState("")


    const setSykmeldingIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSykmeldingId(event.target.value)
    }

    const setFnrHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setFnr(event.target.value)
    }

    const setOrgnummerHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setOrgnummer(event.target.value)
    }

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setSykmeldingId(sykmeldingId)
        setFnr(fnr)
        setOrgnummer(orgnummer)
        //TODO also send to backend api
    }

    // TODO need to swap out "Ola Normann" with loggedin user name, based on token claims
    return (
        <div>
            <Header>
                <Header.Title as="h1">Macgyver</Header.Title>
                <Header.User name="Ola Normann"/>
            </Header>
            <BodyShort>
                Sender ny NL-request til altinn
            </BodyShort>
            <form onSubmit={submitHandler}>
                <TextField label="sykmeldingId" size="medium" onChange={setSykmeldingIdHandler}/>
                <TextField label="fnr" size="medium" onChange={setFnrHandler}/>
                <TextField label="orgnummer" size="medium" onChange={setOrgnummerHandler}/>
                <Button variant="primary" size="medium">Send</Button>
            </form>
        </div>
    )
}


export default NyNLRequestAltinn