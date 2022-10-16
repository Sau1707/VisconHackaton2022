import Box from "../components/Box"
import Grid from "../components/Grid"
import { useSession, signOut } from "next-auth/react";
import { getUserExists, addNewUser } from "../fetch/util"
import { useRouter } from 'next/router'
import Avatar from "../components/Avatar"

const ChallengesText = "Level up your fitness game by competing with others for flags and... maybe... legendary trophies. Every week a new challenge is issued and players are paired by skill level, commitment, and interests. The first to complete the tasks wins that weeks' flag. With enough flags, you will find greater rewards to encourage you forward into a way of lifelong health and vigor."
const TeamText = "Coming soon."
const CaptureTheFlagText = "Don't just be healthy, have fun and learn new things! By participating in a large variety of ASVZ's sports you can earn badges representing your willingness to leave your comfort zone. Show off your collection to friends or use them for unique vouchers at affiliated organizations."
const AchievementsText = "Relive your past victories and track your stats using the achievments section. The best way to improve is to know how far you've come and understand your strengthes and weaknesses, and the best way to know, is to keep track of your progress. We handle the details for you, so you can focus on your journey and guide your decisions far into the future."


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
                    href="challenges"
                    image="/dalle/challenge.png"
                    front={<></>}
                    back={
                        <div style={{ padding: 30 }}>
                            <h2 className="with-eight" style={{ fontWeight: "bold" }}> Challenges </h2>
                            <h5 className="with-eight" > {ChallengesText} </h5>
                        </div>
                    }
                />
                <Box
                    href=""
                    title="Team"
                    image="/dalle/team.png"
                    front={<></>}
                    back={
                        <div style={{ padding: 30 }}>
                            <h2 className="with-eight" style={{ fontWeight: "bold" }}> Team </h2>
                            <h5 className="with-eight"> {TeamText} </h5>
                        </div>
                    }
                />
                <Box
                    href="capture"
                    image="/dalle/cups.png"
                    front={<></>}
                    back={
                        <div style={{ padding: 30 }}>
                            <h2 className="with-eight" style={{ fontWeight: "bold" }}> Capture The Flag  </h2>
                            <h5 className="with-eight"> {CaptureTheFlagText} </h5>
                        </div>
                    }
                />
                <Box
                    href="achievements"
                    image="/dalle/plot.png"
                    front={<></>}
                    back={
                        <div style={{ padding: 30 }}>
                            <h2 className="with-eight" style={{ fontWeight: "bold" }}> My Achievements </h2>
                            <h5 className="with-eight" > {AchievementsText} </h5>
                        </div>
                    }
                />
            </Grid>
        </>
    )
}
