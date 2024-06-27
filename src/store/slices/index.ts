import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import SpaceReducer from "./SpaceSlice";

const rootReducer = combineReducers({
  auth: AuthReducer,
  space: SpaceReducer,
});

export default rootReducer;
