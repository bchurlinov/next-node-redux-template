import {createStore, applyMiddleware, compose} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const middleware = [thunk];

export const makeStore = (initialState, options) => {
    return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
}