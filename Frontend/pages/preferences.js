import { useState } from "react"
import { FaSave } from 'react-icons/fa';

import SelectableFlag from "../components/SelectableFlag";
import FlagBox from "../components/FlagBox";
import Avatar from "../components/Avatar";
import GoBack from "../components/GoBack";

/* Navigation */
import { useRouter } from 'next/router'
import { addNewUser } from "../fetch/util"

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
    const [userHasEdited, setUserHasEdited] = useState(false);
    const [activeFlags, setActiveFlags] = useState(generateFlags());

    const updateActiveFlags = (el) => {
        if (!userHasEdited) setUserHasEdited(true)
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
            {
                userHasEdited ? (
                    <div style={{ position: "absolute", top: 30, left: 90, cursor: "pointer" }}>
                        <FaSave onClick={savePreferences} size={48} color={"rgb(3, 252, 52)"} />
                    </div>
                ) : <></>
            }

            <h3 style={{ marginTop: 30, marginBottom: 60, textAlign: "center" }}> Select your favourite activities </h3>
            <FlagBox>
                {ACTIVITIES.map((e, i) => (
                    <SelectableFlag selected={activeFlags[e.name]} key={i} name={e.name} onClick={updateActiveFlags} img={e.img} />
                ))}
            </FlagBox>
        </>
    )
}