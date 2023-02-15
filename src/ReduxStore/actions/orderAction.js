import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_HISTORY_FAIL,
  ORDER_HISTORY_REQUEST,
  ORDER_HISTORY_SUCCESS,
} from "../Constants/orderConstant";
import Axios from "axios";
import { CART_EMPTY } from "../Constants/cartConstants";
import { BASE_URL } from "../../Helper/helper";
export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_CREATE_REQUEST,
    payload: order,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    console.log(userInfo.token);
    const { data } = await Axios.post(`${BASE_URL}/api/orders`, order, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    console.log(data.order);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.order,
    });
    dispatch({
      type: CART_EMPTY,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
    payload: orderId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`${BASE_URL}/api/orders/${orderId}`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderHistory = () => async (dispatch, getState) => {
  dispatch({
    type: ORDER_HISTORY_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`${BASE_URL}/api/orders/orderhistory`, {
      headers: {
        authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: ORDER_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_HISTORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
