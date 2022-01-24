import {jsonApi, ProductType, ReasonType} from "../DAL/JsonApi";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
export type SelectedProductType = ProductType & {
    reason: string
}
const initialState: Array<SelectedProductType> = []

const slice = createSlice({
    name: "selectedProducts",
    initialState: initialState,
    reducers: {
        addProductToSelctedAC(state, action: PayloadAction<{ product: SelectedProductType }>) {
            state.push(action.payload.product)
        },
        deleteProductFromSelctedAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addReasonAC(state, action: PayloadAction<{id: string, reason: string }>) {

            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state[index].reason = action.payload.reason
            }
        },
    },
})
export const {addProductToSelctedAC, deleteProductFromSelctedAC, addReasonAC} = slice.actions
export const selectedProductsReducer = slice.reducer