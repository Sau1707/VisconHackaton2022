import ChallengeBox from "../components/ChallengeBox"


export const getServerSideProps = async () => {
    // Fetch data from external API
    const res = await fetch(`https://asvz.ch/asvz_api/sport_search?_format=json&limit=999`); //can use await bc. async
    const data = await res.json();

    const titleData = {} // "title": desc

    //console.log(Object.keys(data))


    data.results.forEach(element => {
        titleData[element.title] = element.summary
    });


    // Pass data to the page via props
    return { props: { titleData } }

}


export default function Challenges(props) {
    return (
        <>
            <ChallengeBox user={100} competitor={76} />
        </>
    )
}

