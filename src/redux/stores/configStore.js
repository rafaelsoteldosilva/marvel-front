import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];
const configStore = createStore(
   rootReducer,
   composeWithDevTools(applyMiddleware(...middleware))
);

export default configStore;
