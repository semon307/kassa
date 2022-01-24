import {productsReducer} from "./ProductsReducer";
import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'
import {reasonsReducer} from "./ReasonsReducer";
import {selectedProductsReducer} from "./SelectedProductsReducer";

const rootReducer = combineReducers({
    products: productsReducer,
    reasons: reasonsReducer,
    selectedProducts: selectedProductsReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
})

export type AppRootStateType = ReturnType<typeof rootReducer>