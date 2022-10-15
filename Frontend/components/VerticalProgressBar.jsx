import { useState } from "react"
import style from "./VerticalProgressBar.module.css"
import { Check } from 'react-bootstrap-icons';

const margin = 40

export default function VerticalProgressBar(props) {

    const [height, setHeight] = useState(0)

    return (
        <div style={{ height: props.height ? props.height : 270 }} className={style.barBox}>
            <div style={{ marginLeft: props.left ? margin : null, marginRight: props.right ? margin : null }} className={style.bar}>
                <div style={{ maxHeight: 200, backgroundColor: "red" }} className={style.barActive}></div>
                <div style={{ top: 65, backgroundColor: "green" }} className={style.dot}><Check color="black" size={50} /></div>
                <div style={{ top: 270 }} className={style.dot}></div>
                <div style={{ top: 475 }} className={style.dot}></div>
                <div className={style.endFlag}>
                    <img width={"100%"} src="endflag.png" />
                </div>
            </div>

        </div>
    )
}

