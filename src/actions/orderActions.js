import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
} from "../constants/orderConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

    if (!userInfo.token) {
      throw new Error("No authentication token found");
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `http://localhost:8000/orders/`,
      order,
      config
    );

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: CART_CLEAR_ITEMS });
    localStorage.removeItem("cartItems");
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    }

    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

    if (!userInfo.token) {
      throw new Error("No authentication token found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8000/orders/${id}`,
      config
    );

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    }

    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_MY_REQUEST });

    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    const token = userInfo.token || userInfo.access;
    if (!token) {
      throw new Error("No authentication token found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(
      "Fetching orders from:",
      `http://localhost:8000/orders/myorders/`
    );
    const { data } = await axios.get(
      `http://localhost:8000/orders/myorders/`,
      config
    );
    console.log("Orders response:", data);
    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("Error fetching orders:", error);
    if (error.response?.status === 401) {
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    }

    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload: error.response?.data?.detail || error.message,
    });
  }
};
