import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDeatailReducer,
} from "./reducers/productReducers";

import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userSignupReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDeatailReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItem")
  ? JSON.parse(localStorage.getItem("cartItem"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
