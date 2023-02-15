import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from "../ReduxStore/actions/cartActions";

export default function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (!userInfo){
      navigate("/signin");
    }
  }, [navigate, userInfo]);


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder')  
  };
  return (
    <div className="container-sm" style={{ padding: "4em" }}>
      <p
        className="h2"
        style={{ textAlign: "center", textDecoration: "underline" }}
      >
        Payment Method
      </p>
      <form onSubmit={submitHandler}>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id="Paypal"
            value="paypal"
            required
            onClick={(e) => {setPaymentMethod(e.target.value)}}
          />
          <label className="form-check-label">
            Paypal
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="paymentMethod"
            id="Stripe"
            value="stripe"
            required
            onClick={(e) => {setPaymentMethod(e.target.value)}}
          />
          <label className="form-check-label">
            Stripe
          </label>
        </div>
        <div className="container" style={{ textAlign: "center" }}>
          <button
            type="submit"
            className="btn btn-dark"
            style={{ width: "100%" }}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
