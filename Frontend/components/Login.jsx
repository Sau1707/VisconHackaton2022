import style from "./Login.module.css"
import { useRouter } from 'next/router'
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import { UserContext } from "../pages/_app"
import { useContext, useEffect } from "react";

export default function LoginBox(props) {
    const { username, setUsername } = useContext(UserContext)
    const router = useRouter()
    const href = props.href;

    /* If user is logged, go to home directly */
    useEffect(() => {
        if (typeof window === "undefined") return
        if (username) router.push(href)
    }, [])


    const loginUser = (e) => {
        if (typeof window === "undefined") return
        let el = document.getElementById("inputusername")
        setUsername(el.value)
        e.preventDefault()
        router.push(href)
    }

    const handleKey = (e) => {
        if (e.key === 'Enter') loginUser(e)
    }

    return (
        <div className={style.mainBox}>
            <h3> Welcome </h3>
            <h5> Please insert your username </h5>
            <Form.Control
                type="text"
                id="inputusername"
                aria-describedby="inputusername"
                onKeyDown={handleKey}
            />
            <div className={style.button}>
                <Button onClick={loginUser} variant="primary" type="submit">
                    Submit
                </Button>
            </div>
        </div>
    )
}