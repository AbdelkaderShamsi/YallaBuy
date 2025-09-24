import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGOUT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../constants/userConstants";
import { clearAutoLogout } from "../utils/AutoLogout";

export const signup =
  (fname, lname, email, phone, password, birthdate, gender) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });

      const config = { headers: { "Content-type": "application/json" } };

      const { data } = await axios.post(
        "/register/",
        { fname, lname, email, phone, password, birthdate, gender },
        config
      );

      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload: error.response?.data?.detail || error.message,
      });
    }
  };

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = { headers: { "Content-type": "application/json" } };

    const { data } = await axios.post(
      "/user/login/",
      { username: email, password },
      config
    );

    const userInfoWithExpiry = {
      ...data,
      token: data.access,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };

    dispatch({ type: USER_LOGIN_SUCCESS, payload: userInfoWithExpiry });

    localStorage.setItem("userInfo", JSON.stringify(userInfoWithExpiry));

    const savedData = localStorage.getItem("userInfo");
    console.log("Saved to localStorage:", savedData);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  
  clearAutoLogout();

  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({ type: USER_LOGOUT });
};

export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.access}`,
      },
    };

    const { data } = await axios.get("/profile/", config);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo?.access}`,
      },
    };

    const { data } = await axios.put("/profile/update/", user, config);

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};
