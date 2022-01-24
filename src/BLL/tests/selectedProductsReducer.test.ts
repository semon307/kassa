import {
    addProductToSelctedAC, addReasonAC,
    deleteProductFromSelctedAC,
    selectedProductsReducer,
    SelectedProductType
} from "../SelectedProductsReducer";

let startState: Array<SelectedProductType> = [];
beforeEach(() => {
    startState = [
        {id: "1", name: "Redux", price: "100", reason: ""}
    ]
})
test('products should be added to selected list', () => {
    const action = addProductToSelctedAC({product: {id: "2", name: "React", price: "100", reason: ""}})
    const endState = selectedProductsReducer(startState, action)
    expect(endState.length).toBe(2)
    expect(endState[1].name).toBe("React")
})
test('product should be deleted', () => {
    const action = deleteProductFromSelctedAC({id: "1"})
    const endState = selectedProductsReducer(startState, action)
    expect(endState.length).toBe(0)
})
test('reason should be added', () => {
    const action = addReasonAC({id: "1", reason: "Истек срок годности"})
    const endState = selectedProductsReducer(startState, action)
    expect(endState.length).toBe(1)
    expect(endState[0].reason).toBe("Истек срок годности")
})