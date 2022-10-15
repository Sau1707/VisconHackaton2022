import Box from "../components/Box"
import Grid from "../components/Grid"
import { useSession, signOut } from "next-auth/react";
import { getUserExists, addNewUser } from "../fetch/get"
import { useRouter } from 'next/router'
import Avatar from "../components/Avatar"

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce turpis odio, interdum eu nibh in, volutpat ullamcorper massa. Maecenas consectetur, elit vitae dictum fringilla, leo odio ornare quam, congue mattis diam arcu id urna. Suspendisse ut tortor facilisis massa scelerisque fringilla et et nibh."


const testUsername = "" // session.user.name

export default function Home() {
    const router = useRouter()
    const { data: session, status } = useSession();

    /* Check if user exist, if dont -> resent to ask for preferences */
    getUserExists(testUsername).then(e => {
        if (!e.data.Exists) router.push("/preferences")
        else console.log("User already logged")
    })

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "5vh", background: "none" }}> Welcome {session.user.name} </h1>
            <Avatar />
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
