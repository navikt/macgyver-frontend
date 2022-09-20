import {ChangeEvent, FormEvent, useState} from "react"
import {BodyShort, Button, TextField} from "@navikt/ds-react";
import {Header} from "@navikt/ds-react-internal";
import "@navikt/ds-css";
import "@navikt/ds-css-internal";


const HentListeAvOppgaver = () => {


    const [oppgaveider, setOppgaveider] = useState("")


    const setOppgaveiderdHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setOppgaveider(event.target.value)
    }

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setOppgaveider(oppgaveider)

        //TODO also send to backend api
    }

    // TODO need to swap out "Ola Normann" with loggedin user name, based on token claims
    return (
        <div>
            <Header>
                <Header.Title as="h1">Macgyver</Header.Title>
                <Header.User name="Ola Normann"/>
            </Header>
            <BodyShort>Hent en liste av oppgaver med oppgaveId fra Oppgave-api</BodyShort>
            <BodyShort>eks: 2,3,4,5</BodyShort>
            <form onSubmit={submitHandler}>
                <TextField label="oppgaveider" size="medium" onChange={setOppgaveiderdHandler}/>
                <Button variant="primary" size="medium">Hent</Button>
            </form>
        </div>
    )
}


export default HentListeAvOppgaver