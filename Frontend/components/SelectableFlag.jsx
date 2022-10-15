import style from "./SelectableFlag.module.css"

/* */
export default function SelectableFlag(props) {

    return (
        <div onClick={() => props.onClick(props.name)} className={style.flagBox}>
            <div className={`${style.mainFlag} ${props.selected ? style.flagSelected : null}`}>
                <div className={style.image}>
                    <img width="100%" src={props.img} />
                </div>
            </div>
        </div>

    )
}