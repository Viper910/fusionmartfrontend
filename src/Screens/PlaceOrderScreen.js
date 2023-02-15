import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import MessageBox from "../Components/MessageBox";
import { removeFromCart } from "../ReduxStore/actions/cartActions";
import { createOrder } from "../ReduxStore/actions/orderAction";
import { ORDER_CREATE_RESET } from "../ReduxStore/Constants/orderConstant";

function extractNumber(string) {
  const number = string ? Number(string.replace(/\D/g, "")) : ""; // i have used regex to extract number from string
  return number;
}

function toPrice(num) {
  return Number(num.toFixed(2));
}

export default function PlaceOrderScreen() {
  const cart = useSelector((state) => state.cart);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  cart.itemPrice = toPrice(
    cart.cartItems.reduce(
      (a, c) => a + Number(c.qty) * extractNumber(c.price),
      0
    )
  );

  cart.shippingPrice = cart.itemsPrice <= 500 ? 50 : 0;

  cart.taxPrice = toPrice(
    cart.cartItems.reduce(
      (a, c) => a + Number(c.qty) * (extractNumber(c.price) * 0.07),
      0
    )
  );

  cart.totalPrice = cart.itemPrice + cart.shippingPrice + cart.taxPrice;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  const removeCartHandler = (id) => {
    //delete action
    dispatch(removeFromCart(id));
  };
  console.log({ ...cart, orderItems: cart.cartItems });

  const placeOrderHandler = () => {
    //place order handler
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin");
    }
    if (success) {
      navigate(`/placeorder/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, navigate, success, order, userInfo]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div
          className="col-sm-6"
          style={{ marginTop: "10px", maxWidth: "45em" }}
        >
          <div className="card">
            <h5 className="card-header">Shopping Address</h5>
            <div className="card-body">
              <h5 className="card-title">
                Name: {cart.shippingAddress.fullname}
              </h5>
              <p className="card-text">
                Address:{" "}
                {`${cart.shippingAddress.address}, ${cart.shippingAddress.city}, ${cart.shippingAddress.postalcode}, ${cart.shippingAddress.country}`}
              </p>
            </div>
            <h5 className="card-header">Payment Method</h5>
            <div className="card-body">
              <p className="card-text">
                <strong>Payment Method: </strong>
                {cart.paymentMethod}
              </p>
            </div>
          </div>
          <div className="col-sm-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total</h5>
                <h6 className="card-text">
                  Total Items Price:{" "}
                  <span style={{ float: "right" }}>₹{cart.itemPrice}</span>
                </h6>
                <h6 className="card-text">
                  Shipping Price:{" "}
                  <span style={{ float: "right" }}>₹{cart.shippingPrice}</span>
                </h6>
                <h6 className="card-text">
                  TaxPrice:{" "}
                  <span style={{ float: "right" }}>₹{cart.taxPrice}</span>
                </h6>
                <h6 className="card-text">
                  Total Price:{" "}
                  <span style={{ float: "right" }}>₹{cart.totalPrice}</span>
                </h6>
                <div style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-dark btn-lg btn-block"
                    style={{ margin: "5px" }}
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </button>
                  {loading ? <Loader /> : <></>}
                  {error ? <MessageBox>{error}</MessageBox> : <></>}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <h1 className="card-header">Order Details</h1>
          {cart.cartItems.map((product) => (
            <div
              className="card mb-3"
              style={{ maxWidth: "45em", marginTop: "10px" }}
              key={product.product}
            >
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={product.image}
                    className="img-fluid rounded-start"
                    style={{ height: "10em" }}
                    alt={product.name}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{product.brand}</h5>
                    <h6 className="card-text">{product.name}</h6>
                    <div className="row" style={{ marginTop: "1em" }}>
                      <div className="col-sm" style={{ padding: "20px" }}>
                        <h6 className="card-text">
                          Price:
                          {` ${product.qty} x ${product.price}  = ₹${toPrice(
                            Number(product.qty) * extractNumber(product.price)
                          )}`}
                        </h6>
                      </div>
                      <div className="col-sm">
                        <button
                          className="btn btn-secondary"
                          onClick={() => removeCartHandler(product.product)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
