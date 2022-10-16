import ChartBox from "../components/ChartBox";
import Tracker from "../components/Tracker";
import GoBack from "../components/GoBack";
import Avatar from "../components/Avatar";
import Title from "../components/Title";

export default function Achievements() {
    return (
        <>
            <Title
                title="My Achievements"
                desc="Way to go!"
            />
            <GoBack />
            <Avatar />
            <div style = {{marginTop: "100px", display: "grid", gridTemplateColumns: "40% 20% 20%"}}>
                <div style = {{marginLeft: "100px", marginTop: "100px", width: "100px", height: "100px", float: "left", width: "fit-content", blockSize: "fit-content"}}>
                    <ChartBox></ChartBox>
                    <h3 style={{marginLeft: "250px", marginTop: "50px", whiteSpace: "nowrap"}}>Cumulated wins</h3>
                </div>
                <div style = {{marginLeft: "100px", width: "100px", height: "50px", float: "left", width: "fit-content", blockSize: "fit-content"}}>
                    <Tracker percentage = {60} ></Tracker>
                    <h3 style={{marginLeft: "150px", marginTop: "20px", whiteSpace: "nowrap"}}>Challenges participated</h3>
                </div>
                <div style = {{marginLeft: "100px", width: "100px", height: "50px", float: "left", width: "fit-content", blockSize: "fit-content"}}>
                    <Tracker percentage = {30}></Tracker>
                    <h3 style={{marginLeft: "180px", marginTop: "20px", whiteSpace: "nowrap"}}>Sports discovered</h3>
                </div>
                <div></div>
                <div style = {{position: "relative", left: "100px", top: "-200px", width: "fit-content", blockSize: "fit-content"}}>
                    <Tracker percentage = {40}></Tracker>
                    <h3 style={{marginLeft: "200px", marginTop: "20px", whiteSpace: "nowrap"}}>Challenges won</h3>
                </div>
                <div style = {{position: "relative", left: "100px", top: "-200px", width: "fit-content", blockSize: "fit-content"}}>
                    <Tracker percentage = {80}></Tracker>
                    <h3 style={{marginLeft: "265px", marginTop: "20px"}}>Cool</h3>
                </div>
            </div>
        </>
    )
}