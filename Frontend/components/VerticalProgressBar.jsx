import { useState, useEffect } from "react"
import style from "./VerticalProgressBar.module.css"
import { Check, Question } from 'react-bootstrap-icons';

// TODO: add checkbox features to record progress in the challenge 

const margin = 40
const steps = [15, 45, 75]

export default function VerticalProgressBar(props) {

    const getCurrentHeight = () => {
        let maxHeight = props.height ? props.height : 270
        let currentPercentual = height ? height : 0
        return (maxHeight / 100) * currentPercentual
    }

    const [height, setHeight] = useState(0)

    return (
        <div style={{ height: props.height ? props.height : 270 }} className={style.barBox}>
            <div style={{ marginLeft: props.left ? margin : null, marginRight: props.right ? margin : null }} className={style.bar}>
                <div style={{ maxHeight: getCurrentHeight() }} className={`${style.barActive} ${height >= 75 ? style.barComplete : null}`}></div>
                <div style={{ top: 40 }} className={`${style.dot} ${height > steps[0] ? style.dotDone : style.dotMissing}`}>
                    {height > steps[0] ? <Check color="black" size={50} /> : <Question color="black" size={50} onClick={() => { setHeight(steps[0] + 1) }} />}
                </div>
                <div style={{ top: 260 }} className={`${style.dot} ${height > steps[1] ? style.dotDone : style.dotMissing}`}>
                    {height > steps[1] ? <Check color="black" size={50} /> : <Question color="black" size={50} onClick={() => { setHeight(steps[1] + 1) }} />}
                </div>
                <div style={{ top: 470 }} className={`${style.dot} ${height > steps[2] ? style.dotDone : style.dotMissing}`}>
                    {height > steps[2] ? <Check color="black" size={50} /> : <Question color="black" size={50} onClick={() => { setHeight(100) }} />}
                </div>
                <div style={{ top: 530 }} className={style.endFlag}>
                    <img width={"100%"} src="endflag.png" />
                </div>
            </div>

        </div >
    )
}
