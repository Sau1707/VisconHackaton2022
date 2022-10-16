import FlagBox from "../components/FlagBox";
import Avatar from "../components/Avatar";
import GoBack from "../components/GoBack";
import Title from "../components/Title";
import Flag from "../components/Flag";

/* Data*/
import ACTIVITIES from "../activities.json"

export default function Capture() {
    return (
        <>
            <GoBack />
            <Avatar />
            <Title
                title="You achievement"
                desc=" Will you be able to collect them all?"
            />

            <FlagBox style={{ rowGap: 80 }}>
                {ACTIVITIES.map((e, i) => (
                    <Flag key={i} name={e.name} img={e.img} />
                ))}
            </FlagBox>
        </>

    )
}