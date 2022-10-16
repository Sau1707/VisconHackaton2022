import ChallengeBox from "../components/ChallengeBox"
import GoBack from "../components/GoBack"
import Avatar from "../components/Avatar"
import ACTIVITIES from "../activities.json"

//export const getServerSideProps = async () => {
//    // Fetch data from external API
//    const res = await fetch(`https://asvz.ch/asvz_api/sport_search?_format=json&limit=999`); //can use await bc. async
//    const data = await res.json();
//
//    const titleData = {}
//
//    data.results.forEach(element => {
//        titleData[element.title] = {
//            summary: element.summary,
//            number: element.nid
//        }
//    });
//
//    return { props: { titleData } }
//
//}

/* Temp functions */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function generateRandomChannelges() {
    let random = [...ACTIVITIES]
    shuffle(random)
    return random.slice(0, 3)
}

export default function Challenges() {

    /* TODO: Add request to database insead of random */
    const challenges = generateRandomChannelges()
    console.log(challenges)

    //when initializing user and competitor set initial value by passing a request to the server
    return (
        <>
            <GoBack />
            <Avatar />
            <div style={{ marginTop: 30, marginBottom: 30, textAlign: "center" }}>
                <h1> Challenge of the weeks </h1>
                <h5> Be the first one to complete them! </h5>
            </div>
            <ChallengeBox user={100} competitor={5} sports={challenges} />
        </>
    )
}

