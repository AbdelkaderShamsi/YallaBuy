import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  productsListReducers,
  productDetailsReducers,
} from "./reducers/productsReducers";
import {
  userDetailsReducer,
  userLoginReducers,
  userSignupReducers,
  userUpdateProfileReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderListMyReducer,
} from "./reducers/orderReducers";
import { wishlistReducer } from "./reducers/wishlistReducers";

const reducer = combineReducers({
  productsList: productsListReducers,
  productDetails: productDetailsReducers,
  userLogin: userLoginReducers,
  userSignup: userSignupReducers,
  userUpdateProfile: userUpdateProfileReducer,
  userDetails: userDetailsReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderListMy: orderListMyReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const wishlistFromStorage = localStorage.getItem("wishlistItems")
  ? JSON.parse(localStorage.getItem("wishlistItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  wishlist: { wishlistItems: wishlistFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
