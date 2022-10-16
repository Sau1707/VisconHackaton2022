import ChartBox from "../components/ChartBox";
import Tracker from "../components/Tracker";
import GoBack from "../components/GoBack";
import Avatar from "../components/Avatar";
import AchievementGrid from "../components/AchievementGrid"

export default function Achievements() {
    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "60px" }}>My Achievements</h1>
            <GoBack />
            <Avatar />
            <div style = {{marginTop: "100px", display: "grid", gridTemplateColumns: "40% 20% 20%"}}>
                <div style = {{marginLeft: "100px", marginTop: "100px", width: "100px", height: "100px", float: "left", width: "fit-content", blockSize: "fit-content"}}>
                    <ChartBox></ChartBox>
                </div>
                <div style = {{marginLeft: "100px", width: "100px", height: "50px", float: "left", width: "fit-content", blockSize: "fit-content"}}>
                    <Tracker></Tracker>
                    <h3 style={{marginLeft: "265px", marginTop: "20px"}}>Cool</h3>
                </div>
                <div style = {{marginLeft: "100px", width: "100px", height: "50px", float: "left", width: "fit-content", blockSize: "fit-content"}}>
                    <Tracker></Tracker>
                    <h3 style={{marginLeft: "265px", marginTop: "20px"}}>Cool</h3>
                </div>
                <div></div>
                <div style = {{position: "relative", left: "100px", top: "-160px", width: "fit-content", blockSize: "fit-content"}}>
                    <Tracker></Tracker>
                    <h3 style={{marginLeft: "265px", marginTop: "20px"}}>Cool</h3>
                </div>
                <div style = {{position: "relative", left: "100px", top: "-160px", width: "fit-content", blockSize: "fit-content"}}>
                    <Tracker></Tracker>
                    <h3 style={{marginLeft: "265px", marginTop: "20px"}}>Cool</h3>
                </div>
            </div>
        </>
    )
}