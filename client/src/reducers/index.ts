import { combineReducers } from "redux";
import authReducer from "../features/auth/redux/reducer";

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Định nghĩa kiểu dữ liệu cho store

export default rootReducer;
