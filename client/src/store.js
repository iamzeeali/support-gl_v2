import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./_reducers";

const initialState = {};

const middleware = [thunk];

//production
// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(applyMiddleware(...middleware))
// );

//development
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
