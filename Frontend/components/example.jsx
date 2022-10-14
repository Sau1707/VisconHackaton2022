import style from "./example.module.css"

export default function Example(props) {
    return (<h1 className={style.exampleClass}> {props.children} </h1>)
}