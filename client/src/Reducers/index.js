import { combineReducers } from "redux";
import userReducer from "./userReducer";
import itemReducer from "./itemReducer";
import adminReducer from "./adminReducer";
import orderReducer from "./orderReducer";

export default combineReducers({
  user: userReducer,
  item: itemReducer,
  admin: adminReducer,
  order: orderReducer
});
