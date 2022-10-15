import Box from "../components/Box"
import Grid from "../components/Grid"
import { useSession, signOut, signIn } from "next-auth/react";

// <button onClick={() => signIn("vseth-keycloak")}>Sign in</button>


const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce turpis odio, interdum eu nibh in, volutpat ullamcorper massa. Maecenas consectetur, elit vitae dictum fringilla, leo odio ornare quam, congue mattis diam arcu id urna. Suspendisse ut tortor facilisis massa scelerisque fringilla et et nibh."

export default function Home() {
    const { data: session, status } = useSession();

    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "3vh", background: "none" }}> Welcome {session.user.name} </h1>
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
