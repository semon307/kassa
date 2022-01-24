import {Modal} from "../../Common/Modals/Modal";
import React, {useState} from "react";
import s from "./ButtonComponent.module.css"
import styled, {css} from "styled-components";
import Select from "../../Common/Select/Select";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../BLL/store";
import {jsonApi, ReasonType} from "../../../DAL/JsonApi";
import {addReasonAC, SelectedProductType} from "../../../BLL/SelectedProductsReducer";
export type ResultType = {
    [key: string] : string
}
export const ButtonComponent = () => {
    const [activePopUp, setActivePopUp] = useState<boolean>(false)
    const [notification, setNotification] = useState<boolean>(false)
    const reasonsState = useSelector<AppRootStateType, Array<ReasonType>>(state => state.reasons)
    const reasons = reasonsState.map(r => r.name)
    const products = useSelector<AppRootStateType, Array<SelectedProductType>>(state => state.selectedProducts)
    const dispatch = useDispatch()
    const disabled = !products.every(p => p.reason !== "")
    const onAddReason = (id: string, reason: string) => {
        dispatch(addReasonAC({id, reason}))
    }
    const compileResult = () => {
        let res: ResultType = {}
        products.forEach(p => res[p.name] = p.reason)
        jsonApi.postHistory(res)
        let resString = JSON.stringify(res)
        console.log(resString)
        setActivePopUp(false)
    }
    const productsForRender = products.map(p => {
        return (
            <div key={p.id} style={{display: "flex", flexDirection: "row", width: "80%", justifyContent: "space-between"}}>
                <div>{p.name}</div>
                <Select options={reasons} id={p.id} value={p.reason} onChangeOption={onAddReason}/>
            </div>
        )
    })
    return (
        <div>
            <Button onClick={() => {
                setActivePopUp(true)
            }}>Списать</Button>
            <Modal active={activePopUp} setActive={setActivePopUp}>
                {products.length ?
                    <div className={s.addPackBlockWrapper} style={{overflowY: "scroll"}}>
                    {productsForRender}
                    <Button red onClick={() => {
                        setActivePopUp(false)
                    }}>Отменить</Button>
                    <Button onClick={compileResult} style={{backgroundColor: "green"}} disabled={disabled}>Продолжить</Button>
                </div>
                    : <span>Выберите продукты для списания</span>
                }
            </Modal>
        </div>
    )
}
export const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #709edb;
  color: #709edb;
  margin: 0 1em;
  padding: 0.25em 1em;
  ${(props: { red?: boolean }) =>
          props.red &&
          css`
            background: #f80202;
            color: white;
          `};
`
