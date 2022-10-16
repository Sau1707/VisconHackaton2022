import ChartBox from "../components/ChartBox"
import Grid from "../components/grid"
import Tracker from "../components/Tracker"
import GoBack from "../components/GoBack"
import Avatar from "../components/Avatar"

export default function Achievements() {
    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "60px" }}>My Achievements</h1>
            <GoBack />
            <Avatar />
            <div style={{ marginLeft: "100px", marginTop: "200px", width: "fit-content", display: "flex", flexDirection: "row" }}>
                <ChartBox></ChartBox>
                <Grid style={{ position: "relative" }}>
                    <Tracker></Tracker>
                    <Tracker></Tracker>
                    <Tracker></Tracker>
                    <Tracker></Tracker>
                </Grid>
            </div>
        </>
    )
}