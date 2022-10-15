import style from "./Flag.module.css"

export default function Flag(props) {
    return (
        <div className={style.mainFlag}>
            <div className={style.image}>
                <img width="100%" src={props.img} />
            </div>
        </div>
    )
}