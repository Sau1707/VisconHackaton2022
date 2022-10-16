import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { FiX } from 'react-icons/fi';
import { useState } from "react"
import style from "./Flag.module.css"

export default function Flag(props) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div onClick={() => setOpen(true)} className={`${style.flagBox} ${style.maxed}`}>
                <div className={style.mainFlag}>
                    <div className={style.image}>
                        <h5 className={style.title}> {props.name.charAt(0).toUpperCase() + props.name.slice(1)} </h5>
                        <div className={style.image}>
                            <img width="100%" src={props.img} />
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                fullWidth
                maxWidth="lg"
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle> Demo element
                    <div className={style.dialogTools}>
                        <FiX
                            size={30}
                            color="red"
                            cursor="pointer"
                            onClick={() => { }}
                        />
                    </div>
                </DialogTitle>
                <DialogContent>
                </DialogContent >
            </Dialog>
        </>
    )
}