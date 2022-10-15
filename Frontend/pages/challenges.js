import ChallengeBox from "../components/ChallengeBox"
import axios from 'axios'
import { useState, useEffect } from "react";

export default function Challenges() {
<<<<<<< Updated upstream
    const [getMessage, setGetMessage] = useState({})

    // the flask server is exposed on port 5000
    useEffect(()=>{
      axios.get('http://localhost:5000/flask/hello').then(response => {
        console.log("SUCCESS", response)
        setGetMessage(response)
      }).catch(error => {
        console.log(error)
      })
  
    }, [])
    return (
        <header className="App-header">
         
          <p>React + Flask Tutorial</p>
          <div>{getMessage.status === 200 ? 
            <h3>{getMessage.data.message}</h3>
            :
            <h3>LOADING</h3>}</div>
        </header>
    );
=======

    /* Fetch data here, */
    return (
        <>
            <ChallengeBox user={80} competitor={20} />
        </>
    )
>>>>>>> Stashed changes
}