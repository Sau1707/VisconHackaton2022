import style from "./GoBack.module.css"
import { useRouter } from 'next/router'
import { BsFillArrowUpLeftSquareFill } from 'react-icons/bs';

export default function GoBack() {
    const router = useRouter()

    const goToIndex = (e) => {
        e.preventDefault()
        router.push("/")
    }
    return (
        <div onClick={goToIndex} className={style.backBox}>
            <BsFillArrowUpLeftSquareFill size={48} />
        </div>
    )
}