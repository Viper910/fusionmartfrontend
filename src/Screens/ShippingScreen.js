import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate} from "react-router-dom";

import { saveShippingAddress } from "../ReduxStore/actions/cartActions";

export default function ShippingScreen() {
  
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
 
  const [fullname, setFullName] = useState(shippingAddress.fullname);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalcode, setPostalCode] = useState(shippingAddress.postalcode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullname, address, city, country, postalcode })
    );
    navigate("/payment");
  };

  useEffect(() => {
    if (!userInfo){
      navigate("/signin");
    }
  }, [navigate, userInfo]);

  return (
    <div className="container-sm" style={{ padding: "4em" }}>
      <p
        className="h2"
        style={{ textAlign: "center", textDecoration: "underline" }}
      >
        Shipping Address
      </p>
      <form onSubmit={submitHandler}>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Full Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="fullname"
              required
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Address
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            City
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="city"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Postal Code
          </label>
          <div className="col-sm-10">
            <input
              type="number"
              className="form-control"
              id="postalcode"
              required
              value={postalcode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Country
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
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
