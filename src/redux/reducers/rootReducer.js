import { combineReducers } from "redux";

import favoriteComicsReducer from "./favoriteComicsReducer";
import comicsReducer from "./comicsReducer";

let rootReducer = combineReducers({
   favoriteComicsReducer,
   comicsReducer,
});

export default rootReducer;
