import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams,} from "react-router-dom";
import Loader from "../Components/Loader";
import MessageBox from "../Components/MessageBox";
import Review from "../Components/Review";
import { productDetailsList } from "../ReduxStore/actions/productActions";

export default function Productscreen(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [qty,setQty] = useState(1);
  const productdetail = useSelector((state) => state.productDetails);
  const { loading, error, product } = productdetail;
  useEffect(() => {
    dispatch(productDetailsList(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/fusionmartfrontend/cart/${id}?qty=${qty}`);
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <MessageBox>Page Not Found</MessageBox>
      ) : (
        <>
          <div className="container-fluid">
            <Link to="/fusionmartfrontend" style={{ color: "black" }}>
              <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </Link>
            <div className="row">
              <div className="col-sm">
                <img
                  style={{ height: "26em", borderRadius: "10px" }}
                  src={`${process.env.PUBLIC_URL}`+product.image}
                  alt={product.name}
                />
              </div>
              <div className="col-sm">
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <div className="card-text">
                      <Review
                        rating={product.rating}
                        numReviews={product.numReviews}
                      />
                    </div>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Price: {product.price}</li>
                    <li className="list-group-item">Description:</li>
                    <li className="list-group-item">{product.description}</li>
                  </ul>
                </div>
              </div>
              <div className="col-sm">
                <div className="card">
                  <div className="card-body">
                    <p className="card-text">
                      Price:
                      <span style={{ float: "right" }}>{product.price}</span>
                    </p>
                    <p className="card-text">
                      Status:
                      {product.countInStock > 0 ? (
                        <span
                          className={"text-success"}
                          style={{ float: "right" }}
                        >
                          In stock
                        </span>
                      ) : (
                        <span
                          className={"text-danger"}
                          style={{ float: "right" }}
                        >
                          Out Of stock
                        </span>
                      )}
                    </p>
                    {product.countInStock > 0 ? (
                      <div className="d-grid gap-2">
                        Quantity:
                        <select
                          className="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          value={qty}
                          onChange={(e)=>setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x)=><option key={x+1} value={x+1}>{x+1}</option>)}
                        </select>
                        <button className="btn btn-dark" type="button" onClick={addToCartHandler}>
                          Add To Cart
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
