import ChartBox from "../components/ChartBox"
import Grid from "../components/grid"
import Box from "../components/box"
import Tracker from "../components/Tracker"

export default function Achievements() {
    return (
        <>
            <h1 style = {{textAlign: "center", marginTop: "60px"}}>My Achievements</h1>
            <div style = {{marginLeft: "100px", marginTop: "200px", width: "fit-content", display: "flex", flexDirection: "row"}}>
                <ChartBox></ChartBox>
                <Grid style = {{position: "relative"}}>
                    <Tracker></Tracker>
                    <Tracker></Tracker>
                    <Tracker></Tracker>
                    <Tracker></Tracker>
                </Grid>
            </div>    
        </>
    )
}