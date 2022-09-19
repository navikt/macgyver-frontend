import {ChangeEvent, FormEvent, useState} from "react"
import {Button} from "@navikt/ds-react";
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
            <p>Sender ny NL-request til altinn</p>
            <form onSubmit={submitHandler}>
                <div>
                    <label>sykmeldingId</label>
                    <input type="text" onChange={setSykmeldingIdHandler}/>
                </div>
                <div>
                    <label>fnr</label>
                    <input type="text" onChange={setFnrHandler}/>
                </div>
                <div>
                    <label>orgnummer</label>
                    <input type="text" onChange={setOrgnummerHandler}/>
                </div>
                <Button variant="primary" size="medium">
                    Send
                </Button>
            </form>
        </div>
    )
}


export default NyNLRequestAltinn