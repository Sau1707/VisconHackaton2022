import style from "./Flag.module.css"
import { Check, Question } from 'react-bootstrap-icons';

export default function Flag(props) {
    return (
        <div className={style.mainFlag}>
            <div className={style.image}>
                <img width="100%" src={props.img} />
            </div>
        </div>
    )
}