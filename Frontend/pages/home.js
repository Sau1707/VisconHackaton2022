import Grid from "../components/grid"
import Box from "../components/box"
import { useRouter } from 'next/router'
import { UserContext } from "./_app"
import { useContext, useEffect } from "react";

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce turpis odio, interdum eu nibh in, volutpat ullamcorper massa. Maecenas consectetur, elit vitae dictum fringilla, leo odio ornare quam, congue mattis diam arcu id urna. Suspendisse ut tortor facilisis massa scelerisque fringilla et et nibh."
export default function Home() {
    const { username, setUsername } = useContext(UserContext)
    const router = useRouter()
    const hrefLogin = "/"

    useEffect(() => {
        if (!username) router.push(hrefLogin)
    }, [])


    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "6vh", background: "none" }}> Welcome {username} </h1>
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
