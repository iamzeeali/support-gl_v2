import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./_reducers";

const initialState = {};

const middleware = [thunk];

// const devTools =
//   process.env.NODE_ENV === "production"
//     ? compose(
//         applyMiddleware(...middleware),
//         window.__REDUX_DEVTOOLS_EXTENSION__ &&
//           window.__REDUX_DEVTOOLS_EXTENSION__()
//       )
//     : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
