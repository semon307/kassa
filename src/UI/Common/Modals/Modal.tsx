import React, {MouseEvent, ReactChild, ReactChildren} from "react";
import s from './Modal.module.css'
import {useDispatch} from "react-redux";


type ModalType =  {
    active:boolean | undefined
    setActive:(active:boolean) => void
    children:ReactChild | ReactChildren;
}

export const Modal = ({active,setActive,children}:ModalType) => {
    const modalHandler = (e:MouseEvent) => {
        e.stopPropagation();
    }
    const onClickHandlerSetActive = () => {
        setActive(false)
    }

    return(
        <div className={active ? s.modal_active: s.modal} onClick={onClickHandlerSetActive}>
            <div className={active ? s.modal_Content_active : s.modal_Content} onClick={modalHandler}>
                {children}
            </div>
        </div>
    )
}