import axios from "axios";
import {ResultType} from "../UI/Components/ButtonComponent/ButtonComponent";

const instance = axios.create({
    baseURL: 'http://localhost:8000/',
})
export const jsonApi = {
    getProducts(){
        return instance.get<ProductType[]>("/products/")
    },
    getReasons(){
        return instance.get<ReasonType[]>("/reasons/")
    },
    postHistory(historyObj: ResultType){
        return instance.post("/history/", historyObj)
    },
    getHistory(){
        return instance.get("/history/")
    }
}
export type ProductType = {
    "id": string
    "name": string
    "price": string
}
export type ReasonType = {
    id: string
    name: string
}