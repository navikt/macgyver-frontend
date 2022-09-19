import {ChangeEvent, FormEvent, useState} from "react"
import {Button} from "@navikt/ds-react";
import {Header} from "@navikt/ds-react-internal";
import "@navikt/ds-css";
import "@navikt/ds-css-internal";


const IdentEndring = () => {

    const [fnr, setFnr] = useState("")
    const [nyttFnr, setNyttFnr] = useState("")


    const setNyttFnrChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNyttFnr(event.target.value)
    }

    const setFnrChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setFnr(event.target.value)
    }

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setNyttFnr(nyttFnr)
        setFnr(fnr)

        // TODO also send to backend api to backend api https://macgyver.dev.intern.nav.no/api/v1/docs/#/Identendring/endreBrukerFnr
    }

    // TODO need to swap out "Ola Normann" with loggedin user name, based on token claims
    return (
        <div>
            <Header>
                <Header.Title as="h1">Macgyver</Header.Title>
                <Header.User name="Ola Normann"/>
            </Header>
            <p>Endrer fnr for et gitt fnr i alle sykmeldinger i SyfoSmRegister og oppdaterer aktive NL-koblinger</p>
            <form onSubmit={submitHandler}>
                <div>
                    <label>fnr</label>
                    <input type="text" onChange={setFnrChangeHandler}/>
                </div>
                <div>
                    <label>nyttFnr</label>
                    <input type="text" onChange={setNyttFnrChangeHandler}/>
                </div>
                <Button variant="primary" size="medium">
                    Endre
                </Button>
            </form>
        </div>
    )
}

export default IdentEndring