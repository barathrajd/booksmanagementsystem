import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  productListReducer,
  productDeatailReducer,
} from './reducers/productReducers';

import { cartReducer } from './reducers/cartReducers';
import {
  userLoginReducer,
  userSignupReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
} from './reducers/userReducers';

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderMyListReducer,
  orderPayReducer,
} from './reducers/orderReducers';
import {
  getUserDetailsReducer,
  userDeleteReducer,
  userListReducer,
  userUpdateReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  orderListReducer,
  orderDeliverReducer,
} from './reducers/adminReducers';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDeatailReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailsReducer,
  getUserDetails: getUserDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderMyList: orderMyListReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItem')
  ? JSON.parse(localStorage.getItem('cartItem'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
