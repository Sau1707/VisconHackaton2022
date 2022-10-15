import Grid from "../components/grid"
import Box from "../components/box"
import { useRouter } from 'next/router'
import { UserContext } from "./_app"
import { useContext, useEffect } from "react";

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
                <Box href="" title="No title">test</Box>
                <Box href="capture" title="Capture The Flag">test</Box>
                <Box href="challenges" title="Challenges">test</Box>
                <Box href="achievements" title="My Achievements">test</Box>
            </Grid>
        </>
    )
}
