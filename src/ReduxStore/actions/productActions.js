import Axios from "axios";
import {
    CAROUSEL_LIST_FAIL,
    CAROUSEL_LIST_REQUEST,
    CAROUSEL_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../Constants/productConstant";
import { BASE_URL } from "../../Helper/helper";
export const listProduct = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`${BASE_URL}/api/products`);
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
      dispatch({
          type:PRODUCT_LIST_FAIL,
          payload:true                                                ///error fix it later
      });
  }
};

export const carouselimagelist = () => async (dispatch) => {
    dispatch({
        type: CAROUSEL_LIST_REQUEST,
    });
    try {
        const imagedata = await Axios.get(`${BASE_URL}/api/carouselimages`);
        dispatch({
            type:CAROUSEL_LIST_SUCCESS,
            payload:imagedata.data
        });
    } catch (error) {
        dispatch({
            type:CAROUSEL_LIST_FAIL,
            payload:true                                                 ///error fix it later
        });
    }
}

export const productDetailsList = (id) => async (dispatch) => {
    dispatch({
        type: PRODUCT_DETAILS_REQUEST,payload:id
    });
    try {
        const productdata = await Axios.get(`${BASE_URL}/api/products/${id}`);
        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:productdata.data
        });
    } catch (error) {
        dispatch({                                              ///error fix it later
            type:CAROUSEL_LIST_FAIL,
            payload:true
        });
    }
}