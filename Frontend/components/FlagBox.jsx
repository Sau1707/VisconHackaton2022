import style from "./FlagBox.module.css"

export default function FlagBox(props) {
    return (
        <div style={{ ...props.style }} className={style.flagGrid}>
            {props.children.map((e, i) => (
                <div key={i}> {e} </div>
            ))}
        </div>
    )
}