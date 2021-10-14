import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import authReducer from "./Reducers/authReducers";
import postReducers from "./Reducers/postReducers";

const middlewares = [thunk]

const rootReducers = combineReducers({
    auth : authReducer,
    posts : postReducers
})

const store = createStore(rootReducers,composeWithDevTools(applyMiddleware(...middlewares)))

export default store