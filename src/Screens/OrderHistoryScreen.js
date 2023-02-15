import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../ReduxStore/actions/orderAction";
import Loader from "../Components/Loader";
import MessageBox from "../Components/MessageBox";
import { useNavigate } from "react-router-dom";

function getScreenWidth() {
  const { innerWidth: width } = window;
  return width;
}

export default function OrderHistoryScreen() {
  const orderHistory = useSelector((state) => state.orderHistory);
  const { loading, error, orders } = orderHistory;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const width = getScreenWidth();

  const detailsHandler = (orderId) => {
    navigate(`/fusionmartfrontend/placeorder/${orderId}`);
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/fusionmartfrontend/signin");
    } else {
      dispatch(getOrderHistory());
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : width <= 500 ? (
        <>
          {orders.map((order) => (
            <div className="card" style={{ width: "100%", margin: "4px" }}>
              <div className="card-body">
                <h5 className="card-title">Order ID: {order._id}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  <strong>Date:</strong> {order.createdAt}
                </h6>
                <p className="card-text">
                  <strong>Total:</strong> {order.totalPrice}
                </p>
                <p className="card-text">
                  {order.isPaid ? (
                    <p className="text-success">Paid</p>
                  ) : (
                    <p className="text-danger">Not Paid</p>
                  )}
                </p>
                <p className="card-text">
                  {order.isDelivered ? (
                    <p className="text-success">Delivered</p>
                  ) : (
                    <p className="text-danger">Not Delivered</p>
                  )}
                </p>
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  onClick={() => detailsHandler(order._id)}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">OrderID</th>
              <th scope="col">DATE</th>
              <th scope="col">TOTAL</th>
              <th scope="col">PAID</th>
              <th scope="col">DELIVERED</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <th scope="row">{order._id}</th>
                <td>{order.createdAt}</td>
                <td>₹{order.totalPrice}</td>
                <td>{order.isPaid ? "Paid" : "Not Paid"}</td>
                <td>{order.isDelivered ? "Delivered" : "Not Delivered"}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={() => detailsHandler(order._id)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
