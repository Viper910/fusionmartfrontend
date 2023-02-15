import { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import MessageBox from "../Components/MessageBox";
import { getOrderDetails } from "../ReduxStore/actions/orderAction";
import { PayPalButton } from "react-paypal-button-v2";
function extractNumber(string) {
  const number = string ? Number(string.replace(/\D/g, "")) : ""; // i have used regex to extract number from string
  return number;
}

function toPrice(num) {
  return Number(num.toFixed(2));
}

export default function OrderScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { orderId } = params;

  useEffect(() => {
    if (!userInfo) {
      navigate("/fusionmartfrontend/signin");
    } else {
      dispatch(getOrderDetails(orderId));
    }
  }, [userInfo, navigate, orderId, dispatch]);

  return (
    <div className="container-fluid">
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          <h4>Order ID: {order._id}</h4>
          <div
            className="col-sm-6"
            style={{ marginTop: "10px", maxWidth: "45em" }}
          >
            <div className="card">
              <h5 className="card-header">Shopping Address</h5>
              <div className="card-body">
                <h5 className="card-title">
                  Name: {order.shippingAddress.fullname}
                </h5>
                <p className="card-text">
                  Address:{" "}
                  {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalcode}, ${order.shippingAddress.country}`}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">Delivered</MessageBox>
                ) : (
                  <MessageBox> Not Delivered</MessageBox>
                )}
              </div>
              <h5 className="card-header">Payment Method</h5>
              <div className="card-body">
                <p className="card-text">
                  <strong>Payment Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">Paid</MessageBox>
                ) : (
                  <MessageBox> Not Paid</MessageBox>
                )}
              </div>
            </div>
            <div className="col-sm-12">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Total</h5>
                  <h6 className="card-text">
                    Total Items Price:{" "}
                    <span style={{ float: "right" }}>₹{order.itemPrice}</span>
                  </h6>
                  <h6 className="card-text">
                    Shipping Price:{" "}
                    <span style={{ float: "right" }}>
                      ₹{order.shippingPrice}
                    </span>
                  </h6>
                  <h6 className="card-text">
                    TaxPrice:{" "}
                    <span style={{ float: "right" }}>₹{order.taxPrice}</span>
                  </h6>
                  <h6 className="card-text">
                    Total Price:{" "}
                    <span style={{ float: "right" }}>₹{order.totalPrice}</span>
                  </h6>
                  <div style={{ textAlign: "center" }}>
                    <PayPalButton amount={order.totalPrice}/>
                    {loading ? <Loader /> : <></>}
                    {error ? <MessageBox>{error}</MessageBox> : <></>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <h1 className="card-header">Order Details</h1>
            {order.orderItems.map((product) => (
              <div
                className="card mb-3"
                style={{ maxWidth: "45em", marginTop: "10px" }}
                key={product.product}
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={`${process.env.PUBLIC_URL}`+product.image}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
