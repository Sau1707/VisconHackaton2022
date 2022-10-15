import { useState } from "react"
import Button from "react-bootstrap/Button"
import Avatar from "../components/Avatar"
import FlagBox from "../components/FlagBox"
import SelectableFlag from "../components/SelectableFlag"

/* Navigation */
import { useRouter } from 'next/router'
import { getUserExists, addNewUser } from "../fetch/get"

/* Auth */
import { useSession, signOut } from "next-auth/react";

/* TODO move to backend */
const ACTIVITIES = {
    basketball: "/sports/basketball.png",
    fitness: "/sports/fitness.png",
    badminton: "/sports/badminton.png",
    beachwolley: "/sports/beachwolley.png",
    bigair: "/sports/bigair.png",
    arrow: "/sports/arrow.png",
    dance: "/sports/dance.png",
    box: "/sports/box.png",
    taekwondo: "/sports/taekwondo.png",
    football: "/sports/football.png",
    swimming: "/sports/swimming.png",
    diving: "/sports/diving.png",
    tabletennis: "/sports/tabletennis.png",
    hiking: "/sports/hiking.png",
    climbing: "/sports/climbing.png",
    fencing: "/sports/fencing.png",
}

/* Map ACTIVITIES and create array */
function generateFlags() {
    let flags = {}
    Object.keys(ACTIVITIES).forEach(e => {
        flags[e] = false
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
            <Avatar />
            <h3 style={{ marginTop: 30, marginBottom: 60, textAlign: "center" }}> Select your favourite activities </h3>
            <FlagBox>
                {Object.keys(ACTIVITIES).map((e, i) => (
                    <SelectableFlag selected={activeFlags[e]} key={i} name={e} onClick={updateActiveFlags} img={ACTIVITIES[e]} />
                ))}
            </FlagBox>
            <div style={{ margin: "auto", marginTop: 30, marginBottom: 100, width: "fit-content" }}>
                <Button onClick={savePreferences}> Save preferences </Button>
            </div>
        </>
    )
}