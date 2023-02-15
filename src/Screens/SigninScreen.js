import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../Components/Loader";
import MessageBox from "../Components/MessageBox";
import { signIn } from "../ReduxStore/actions/userAction";

export default function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [searchparms] = useSearchParams();

  const redirect = searchparms.get("redirect")
    ? searchparms.get("redirect")
    : "/fusionmartfrontend";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error} = userSignin;

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  return (
    <div className="container-sm" style={{ padding: "4em" }}>
      <p
        className="h2"
        style={{ textAlign: "center", textDecoration: "underline" }}
      >
        Sign in
      </p>
      {loading ? <Loader/>:<></>}
      {error ? <MessageBox>{error}</MessageBox>:<></>}
      <form onSubmit={submitHandler}>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="email"
              className="form-control"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="container" style={{ textAlign: "center" }}>
          <button
            type="submit"
            className="btn btn-dark"
            style={{ width: "100%" }}
          >
            Sign in
          </button>
          <p className="fw-bolder">
            New customer?{" "}
            <Link to={`/fusionmartfrontend/register?redirect=${redirect}`} className="fst-italic">
              Create your account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
