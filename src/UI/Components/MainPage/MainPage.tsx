import React, {useContext} from "react";
import {productsDetailContext} from "../../../App";
import styled, {css} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../BLL/store";
import {ProductType} from "../../../DAL/JsonApi";
import {addProductToSelctedAC, deleteProductFromSelctedAC} from "../../../BLL/SelectedProductsReducer";
import {Button, ButtonComponent} from "../ButtonComponent/ButtonComponent";

export const MainPage = () => {
    const products = useContext(productsDetailContext)
    const selectedProducts = useSelector<AppRootStateType, Array<ProductType>>(state => state.selectedProducts)
    const dispatch = useDispatch()
    const onClickHandler = (product: ProductType) => {
        if (!selectedProducts.some(p => p.id === product.id)) {
            dispatch(addProductToSelctedAC({product: {...product,  reason: ""}}))
        } else {
            dispatch(deleteProductFromSelctedAC({id: product.id}))
        }
    }
    const selectAllHandler = () => {
        products.forEach(p => {
            if (!selectedProducts.some(item => item.id === p.id)) {
                dispatch(addProductToSelctedAC({product: {...p, reason: ""}}))
            }
        })

    }
    const productsForRender = products.map(p => {
        return (
            <ProductCard key={p.id} active={selectedProducts.some(item => item.id === p.id)} onClick={() => {
                onClickHandler(p)
            }}>
                <span>
                    {p.id}
                </span>
                <span>
                    {p.name}
                </span>
                <span>
                    {p.price}
                </span>
            </ProductCard>
        )
    })
    return (
        <div>
        <div style={{marginTop: "20px", display: "flex", flexDirection: "row", width: "80vw", height: "70vh", flexWrap: "wrap"}}>
            {productsForRender}
            <button style={{backgroundColor: "red", borderRadius: "15px", color: "white"}}
                    onClick={selectAllHandler}>Select all
            </button>

        </div>
            <ButtonComponent/>
        </div>
    )
}
type ProductCardTypePropsType = {
    active?: boolean
}
export const ProductCard = styled.div`
  background: #70dbc2;
  border-radius: 15px;
  color: white;
  margin: 0 1em;
  padding: 0.25em 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 150px;
  heigth: 100px;
  align-items: center;
  margin-bottom: 20px;
  ${(props: ProductCardTypePropsType) =>
          props.active &&
          css`
            background: #db7070;
            color: white;
          `};
`