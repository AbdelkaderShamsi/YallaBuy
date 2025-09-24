import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productsConstants";

export const listProducts =
  (category = "", keyword = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      let url = "http://127.0.0.1:8000/products/";
      const params = [];
      if (category) params.push(`category=${encodeURIComponent(category)}`);
      if (keyword) params.push(`search=${encodeURIComponent(keyword)}`);
      if (params.length) url += `?${params.join("&")}`;

      const { data } = await axios.get(url);

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`http://127.0.0.1:8000/product/${id}`);

    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
