import style from "./Box.module.css"
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router'

export default function Box(props) {
    const router = useRouter()

    const redirect = (e) => {
        e.preventDefault()
        props.href ? router.push(props.href) : null
    }

    return (
        <div className={style.flipCard} onClick={redirect}>
            <div className={style.flipCardInner}>
                <div className={style.flipCardFront}>
                    <h1 style={{ padding: 100 }}> {props.title} </h1>
                </div>
                <div className={style.flipCardBack}>
                    <Card className={style.cardBox}>
                        <Card.Body>
                            <Card.Title> {props.title} </Card.Title>
                            <Card.Text>
                                {props.children}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>

    );

}