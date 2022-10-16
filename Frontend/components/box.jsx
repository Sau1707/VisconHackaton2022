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
                    <div className={style.imageBox}>
                        <div className={style.imageElement}> {props.front} </div>
                        {props.image ? <img className={style.image} src={props.image} /> : <></>}
                    </div>
                </div>
                <div className={style.flipCardBack}>
                    <div className={style.imageBox}>
                        <div className={style.imageElement}> {props.back} </div>
                        {props.image ? <img style={{ filter: "blur(2px) brightness(0.5)" }} className={style.image} src={props.image} /> : <></>}
                    </div>
                </div>
            </div>
        </div>

    );

}