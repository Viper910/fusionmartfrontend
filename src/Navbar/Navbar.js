import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Navbar.css";
import { signout } from "../ReduxStore/actions/userAction";
export default function Navbar() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signout());
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/fusionmartfrontend">
          FusionMart
        </Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 list-ul">
          <li className="nav-item list-li">
            {userInfo ? (
              <Link className="nav-link active" to="#">
                Hello,{userInfo.name}
              </Link>
            ) : (
              <Link
                className="nav-link active"
                aria-current="page"
                to="/fusionmartfrontend/signin"
              >
                Sign-in
              </Link>
            )}
          </li>
          <li className="nav-item list-li">
            <Link className="nav-link active" aria-current="page" to="/fusionmartfrontend/cart">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              {cartItems.length > 0 ? (
                <span className="cart-span">{cartItems.length}</span>
              ) : (
                <span className="cart-span">0</span>
              )}
            </Link>
          </li>
        </ul>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
              FusionMart
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#About">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contactus">
                  Contact Us
                </a>
              </li>
              {userInfo ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/fusionmartfrontend/orderhistory">
                      Order History
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="#signout"
                      onClick={signOutHandler}
                    >
                      Sign Out
                    </Link>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
