import Flag from "../components/Flag"
import FlagBox from "../components/FlagBox"
import Avatar from "../components/Avatar"
import GoBack from "../components/GoBack";

/* Data*/
import ACTIVITIES from "../activities.json"

export default function Capture() {
    return (
        <>
            <GoBack />
            <Avatar />
            <div style={{ marginTop: 30, marginBottom: 30, textAlign: "center" }}>
                <h1> You achievement </h1>
                <h5> Will you be able to collect them all? </h5>
            </div>

            <FlagBox style={{ rowGap: 110 }}>
                {ACTIVITIES.map((e, i) => (
                    <Flag key={i} name={e.name} img={e.img} />
                ))}
            </FlagBox>
        </>

    )
}