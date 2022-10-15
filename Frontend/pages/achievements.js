import ChartBox from "../components/ChartBox"
import Grid from "../components/grid"
import Box from "../components/box"

export default function Achievements() {
    return (
        <>
            <h1 style = {{textAlign: "center", marginTop: "60px"}}>My Achievements</h1>
            <div style = {{marginLeft: "100px", marginTop: "200px", width: "fit-content"}}>
                <ChartBox></ChartBox>
            </div>    
        </>
    )
}