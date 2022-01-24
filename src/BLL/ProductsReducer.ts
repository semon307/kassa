import {jsonApi, ProductType} from "../DAL/JsonApi";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState: Array<ProductType> = []
export const fetchProductsTC = createAsyncThunk('products/fetchProducts', async (param, {dispatch}) => {
    const res = await jsonApi.getProducts();
    const products = res.data
    return {products}
})
const slice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchProductsTC.fulfilled, (state, action) => {
            return action.payload.products
        })
    })

})
export const productsReducer = slice.reducer