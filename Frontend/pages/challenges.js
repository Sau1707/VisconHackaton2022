import ChallengeBox from "../components/ChallengeBox"

export async function getStaticProps() {
    /* */
    return {
      props: {data: 848458458}, // will be passed to the page component as props
    }
  }

export default function Challenges(props) {
    props.data
    /* Fetch data here */
    return (
        <>
            <ChallengeBox user={100} competitor={76} />
        </>
    )
}