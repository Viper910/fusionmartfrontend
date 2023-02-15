import Axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../Constants/cartConstants";
import { BASE_URL } from "../../Helper/helper";
export const addToCart = (id,qty) => async(dispatch, getState) => {
    const data = await Axios.get(`${BASE_URL}/api/products/${id}`);
    const productData = data.data;
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name:productData.name,
            image:productData.image,
            price:productData.price,
            brand:productData.brand,
            countInStock:productData.countInStock,
            product:productData._id,
            qty
        }
    });
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}

export const removeFromCart = (productID) => async(dispatch,getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload:{
            productID
        }
    });
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
}


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        payload: data
    })
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (paymentThrough) => (dispatch) => {
    dispatch(
        {
            type:CART_SAVE_PAYMENT_METHOD,
            payload: paymentThrough
        }
    )
}