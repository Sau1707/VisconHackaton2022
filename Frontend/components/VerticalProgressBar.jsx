import { useState, useEffect } from "react"
import style from "./VerticalProgressBar.module.css"
import { Check, Question } from 'react-bootstrap-icons';

/* 

*/

const margin = 40
const steps = [16, 45, 75]

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
                <div style={{ maxHeight: getCurrentHeight() }} className={`${style.barActive} ${props.current == 100 ? style.barComplete : null}`}></div>
                <div style={{ top: 50 }} className={`${style.dot} ${props.current > steps[0] ? style.dotDone : style.dotMissing}`}>
                    {props.current > steps[0] ? <Check color="black" size={50} /> : <Question color="black" size={50} />}
                </div>
                <div style={{ top: 225 }} className={`${style.dot} ${props.current > steps[1] ? style.dotDone : style.dotMissing}`}>
                    {props.current > steps[1] ? <Check color="black" size={50} /> : <Question color="black" size={50} />}
                </div>
                <div style={{ top: 400 }} className={`${style.dot} ${props.current > steps[2] ? style.dotDone : style.dotMissing}`}>
                    {props.current > steps[2] ? <Check color="black" size={50} /> : <Question color="black" size={50} />}
                </div>
                <div style={{ top: 530 }} className={style.endFlag}>
                    <img width={"100%"} src="endflag.png" />
                </div>
            </div>

        </div >
    )
}
