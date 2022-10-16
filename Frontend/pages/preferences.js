import { useState } from "react"
import Button from "react-bootstrap/Button"
import Avatar from "../components/Avatar"
import GoBack from "../components/GoBack";
import FlagBox from "../components/FlagBox"
import SelectableFlag from "../components/SelectableFlag"

/* Navigation */
import { useRouter } from 'next/router'
import { addNewUser } from "../fetch/get"

/* Auth */
import { useSession } from "next-auth/react";

/* Data*/
import ACTIVITIES from "../activities.json"

/* Map ACTIVITIES and create array */
function generateFlags() {
    let flags = {}
    ACTIVITIES.forEach(e => {
        flags[e.name] = false
    })

    return flags
}

const testUsername = "" // session.user.name

export default function Preferences() {
    const router = useRouter()
    const { data: session, status } = useSession();
    const [activeFlags, setActiveFlags] = useState(generateFlags());

    const updateActiveFlags = (el) => {
        let flags = { ...activeFlags }
        flags[el] = !flags[el]
        setActiveFlags(flags)
    }

    // TODO: add preferences
    // IDEA: make people chose at least 3
    const savePreferences = async () => {
        addNewUser(testUsername).then(e => console.log(e))
        router.push("/")
    }

    return (
        <>
            <GoBack />
            <Avatar />
            <h3 style={{ marginTop: 30, marginBottom: 60, textAlign: "center" }}> Select your favourite activities </h3>
            <FlagBox>
                {ACTIVITIES.map((e, i) => (
                    <SelectableFlag selected={activeFlags[e.name]} key={i} name={e.name} onClick={updateActiveFlags} img={e.img} />
                ))}
            </FlagBox>
            <div style={{ margin: "auto", marginTop: 30, marginBottom: 100, width: "fit-content" }}>
                <Button onClick={savePreferences}> Save preferences </Button>
            </div>
        </>
    )
}