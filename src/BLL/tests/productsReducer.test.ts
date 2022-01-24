import {ProductType} from "../../DAL/JsonApi";
import {start} from "repl";
import {fetchProductsTC, productsReducer} from "../ProductsReducer";

let startState: Array<ProductType> = [];
beforeEach(() => {
    startState = [
        {id: "1", name: "React", price: "100"},
        {id: "2", name: "Redux", price: "100"},
    ]
})
test('products should be added', () => {
    const action = fetchProductsTC.fulfilled({products: startState}, "requestedId")
    const endState = productsReducer([], action)
    expect(endState.length).toBe(2)
    expect(endState[1].name).toBe("Redux")
})