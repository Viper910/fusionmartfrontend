import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loader from "../Components/Loader";
import MessageBox from "../Components/MessageBox";
import { register } from "../ReduxStore/actions/userAction";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [passMatch, setPassMatch] = useState(true);
  const [confirmPassword,setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const [searchparms] = useSearchParams();

  const redirect = searchparms.get("redirect")
    ? searchparms.get("redirect")
    : "/";

  console.log(redirect);

  const navigate = useNavigate();
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;
    console.log(error,loading,userInfo);
  const submitHandler = (e) => {
    e.preventDefault();
    if(password!==confirmPassword){
        setPassMatch(false);
    }
    else{
        dispatch(register(name,email,password));
    }
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
        Create Account
      </p>
      {loading ? <Loader/>:<></>}
      {error ? <MessageBox>{error}</MessageBox>:<></>}
      {passMatch===false?<MessageBox>Password and ConfirmPassword are not equal</MessageBox>:<></>}
      <form onSubmit={submitHandler}>
      <div className="row mb-3">
          <label htmlFor="inputName" className="col-sm-2 col-form-label">
            Name
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
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
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
            Renter-Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="container" style={{ textAlign: "center" }}>
          <button
            type="submit"
            className="btn btn-dark"
            style={{ width: "100%" }}
          >
            Create Your Account
          </button>
          <p className="fw-bolder">
            Already have an account?{" "}
            <Link to={`/signin?redirect=${redirect}`} className="fst-italic">
              Sign-in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
