import { combineReducers } from "redux";
import userReducer from "./userReducer";
import carReducer from "./carReducer";
import commonReducer from "./commonReducer";
import FilterReducer from "./filterReducer";
export default combineReducers({
  user: userReducer,
  car: carReducer,
  common: commonReducer,
  filter: FilterReducer,
});
