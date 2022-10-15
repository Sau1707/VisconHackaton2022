import Box from "../components/Box"
import Grid from "../components/Grid"
import FlagBox from "../components/FlagBox";
import SelectableFlag from "../components/SelectableFlag";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "react-bootstrap";
import axios from "axios";

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce turpis odio, interdum eu nibh in, volutpat ullamcorper massa. Maecenas consectetur, elit vitae dictum fringilla, leo odio ornare quam, congue mattis diam arcu id urna. Suspendisse ut tortor facilisis massa scelerisque fringilla et et nibh."

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

function generateFlags() {
    let flags = {}
    Object.keys(ACTIVITIES).forEach(e => {
        flags[e] = false
    })

    return flags
}
export default function Home() {
    const { data: session, status } = useSession();
    const [firstLogin, setfirstLogin] = useState(true)
    const [activeFlags, setActiveFlags] = useState(generateFlags())

    const updateActiveFlags = (el) => {
        let flags = { ...activeFlags }
        flags[el] = !flags[el]
        setActiveFlags(flags)
    }
    const savePreferences = () => {
        const data = {
            "Username": "lsaurwein",
            "Exists Test": true
        }


        

        axios({
            method: "get",
            url: "/backend",
            headers: {
                'Content-Type': 'application/json'
            },
            params: data,
            //data: data, // use this when you do a post
        }).then(e => console.log(e))
        //fetch("/backend", {
        //    method: 'GET', // *GET, POST, PUT, DELETE, etc.
        //    body: JSON.stringify(data)
        //}).then(e => console.log(e))
        ////setfirstLogin(false)
    }

    if (firstLogin) {
        return (
            <>
                <h1 style={{ textAlign: "center" }}> Welcome {session.user.name} to ??? </h1>
                <h4 style={{ textAlign: "center" }}> Please select your sports preferences</h4>
                <FlagBox>
                    {Object.keys(ACTIVITIES).map((e, i) => (
                        <SelectableFlag selected={activeFlags[e]} key={i} name={e} onClick={updateActiveFlags} img={ACTIVITIES[e]} />
                    ))}
                </FlagBox>
                <div style={{ margin: "auto", marginTop: 100, marginBottom: 100, width: "fit-content" }}>
                    <Button onClick={savePreferences}> Save preferences </Button>
                </div>
            </>
        )

    }


    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "10vh", background: "none" }}> Welcome {session.user.name} </h1>
            <button onClick={() => signOut("vseth-keycloak")}>Sign out</button>
            <Grid>
                <Box
                    href=""
                    title="Team"
                    front={
                        <h1 style={{ padding: 100 }}> Team </h1>
                    }
                    back={
                        <div style={{ padding: 30 }}>
                            <h2 > Team </h2>
                            <h5> {loremIpsum} </h5>
                        </div>
                    }
                />
                <Box
                    href="capture"
                    front={
                        <h1 style={{ padding: 100 }}> Capture The Flag </h1>
                    }
                    back={
                        <div style={{ padding: 30 }}>
                            <h2> Capture The Flag  </h2>
                            <h5> {loremIpsum} </h5>
                        </div>
                    }
                />
                <Box
                    href="challenges"
                    front={
                        <h1 style={{ padding: 100 }}> Challenges </h1>
                    }
                    back={
                        <div style={{ padding: 30 }}>
                            <h2> Challenges </h2>
                            <h5> {loremIpsum} </h5>
                        </div>
                    }
                />
                <Box
                    href="achievements"
                    front={
                        <h1 style={{ padding: 100 }}> My Achievements </h1>
                    }
                    back={
                        <div style={{ padding: 30 }}>
                            <h2> My Achievements </h2>
                            <h5> {loremIpsum} </h5>
                        </div>
                    }
                />
            </Grid>
        </>
    )
}
