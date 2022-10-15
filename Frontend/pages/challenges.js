import ChallengeBox from "../components/ChallengeBox"
import axios from 'axios'
import { useState, useEffect } from "react";

export default function Challenges() {
    /* Fetch data here, */
    return (
        <>
            <ChallengeBox user={80} competitor={20} />
        </>
    )
}