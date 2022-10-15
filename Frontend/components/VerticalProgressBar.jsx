import { useState, useEffect } from "react"
import style from "./VerticalProgressBar.module.css"
import { Check, Question } from 'react-bootstrap-icons';

/* 

*/

const margin = 40

export default function VerticalProgressBar(props) {

    const getCurrentHeight = () => {
        let maxHeight = props.height ? props.height : 270
        let currentPercentual = props.current ? props.current : 0
        return (maxHeight / 100) * currentPercentual
    }

    const [height, setHeight] = useState(0)

    return (
        <div style={{ height: props.height ? props.height : 270 }} className={style.barBox}>
            <div style={{ marginLeft: props.left ? margin : null, marginRight: props.right ? margin : null }} className={style.bar}>
                <div style={{ maxHeight: getCurrentHeight() }} className={style.barActive}></div>
                <div style={{ top: 65 }} className={`${style.dot} ${style.dotDone}`}><Check color="black" size={50} /></div>
                <div style={{ top: 270 }} className={`${style.dot} ${style.dotMissing}`}><Question color="black" size={50} /></div>
                <div style={{ top: 475 }} className={`${style.dot} ${style.dotMissing}`}><Question color="black" size={50} /></div>
                <div className={style.endFlag}>
                    <img width={"100%"} src="endflag.png" />
                </div>
            </div>

        </div>
    )
}
