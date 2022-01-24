import {jsonApi, ProductType, ReasonType} from "../DAL/JsonApi";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState: Array<ReasonType> = []
export const fetchReasonsTC = createAsyncThunk('reasons/fetchReasons', async (param, {dispatch}) => {
    const res = await jsonApi.getReasons();
    const reasons = res.data
    return {reasons}
})
const slice = createSlice({
    name: "reasons",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchReasonsTC.fulfilled, (state, action) => {
            return action.payload.reasons
        })
    })

})
export const reasonsReducer = slice.reducer