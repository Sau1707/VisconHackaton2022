import style from "./Flag.module.css"

export default function Flag(props) {
    return (
        <div className={style.flagBox}>
            <div className={style.mainFlag}>
                <div className={style.image}>
                    <h5 className={style.title}> {props.name.charAt(0).toUpperCase() + props.name.slice(1)} </h5>
                    <div className={style.image}>
                        <img width="100%" src={props.img} />
                    </div>
                </div>
            </div>
        </div>
    )
}