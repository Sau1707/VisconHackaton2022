import style from "./Box.module.css"
import { useRouter } from 'next/router'

export default function Box(props) {
    const router = useRouter()

    const redirect = (e) => {
        e.preventDefault()
        props.href ? router.push(props.href) : null
    }

    return (
        <div {...props} style={{ height: props.height ? props.height : 270 }} className={style.flipCard} onClick={redirect}>
            <div className={style.flipCardInner}>
                <div className={style.flipCardFront}>
                    <div> {props.front} </div>
                </div>
                <div className={style.flipCardBack}>
                    <div> {props.back} </div>
                </div>
            </div>
        </div>

    );

}