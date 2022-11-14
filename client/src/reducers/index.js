import { combineReducers } from "redux";

import Products from "./Products";
import Auth from "./Auth";
export const reducers = combineReducers({ Products, Auth });
