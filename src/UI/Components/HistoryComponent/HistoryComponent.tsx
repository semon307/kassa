import React, {useEffect, useState} from "react";
import {ResultType} from "../ButtonComponent/ButtonComponent";
import {ProductCard} from "../MainPage/MainPage";
import {jsonApi} from "../../../DAL/JsonApi";
export const HistoryComponent = () => {
    const [history, setHistory] = useState< null | Array<ResultType>>(null)
    useEffect(() => {
        jsonApi.getHistory()
            .then(res => setHistory(res.data))
    }, [])
    let unitsForRender;
    if (history){
        unitsForRender = history.map(u => {
            return(
                <ProductCard key={u.id}>
                    <span>{u.id}</span>
                    <span>Списано товаров:</span>
                    <span>{Object.values(u).length}</span>
                </ProductCard>
            )
        })
    }
    return(
        <div>
            {unitsForRender}
        </div>
    )
}