import style from "./SelectableFlag.module.css"

/* */
export default function SelectableFlag(props) {

    return (
        <div onClick={() => props.onClick(props.name)} className={style.flagBox}>
            <div className={`${style.mainFlag} ${props.selected ? style.flagSelected : null}`}>
                <h5 className={style.title}> {props.name.charAt(0).toUpperCase() + props.name.slice(1)} </h5>
                <div className={style.image}>
                    <img width="100%" src={props.img} />
                </div>
            </div>
        </div>

    )
}