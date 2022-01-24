import {ReasonType} from "../../DAL/JsonApi";
import {fetchReasonsTC, reasonsReducer} from "../ReasonsReducer";

let startState: Array<ReasonType> = [];
beforeEach(() => {
    startState = [
        {id: "1", name: "Истек срок"},
        {id: "2", name: "Повреждена упаковка" },
    ]
})
test('reasons should be added', () => {
    const action = fetchReasonsTC.fulfilled({reasons: startState}, "requestedId")
    const endState = reasonsReducer([], action)
    expect(endState.length).toBe(2)
    expect(endState[1].id).toBe("2")
})