import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import MessageBox from "../Components/MessageBox";
import { addToCart, removeFromCart } from "../ReduxStore/actions/cartActions";

function extractNumber(string) {
  const number = string ? Number(string.replace(/\D/g, "")) : ""; // i have used regex to extract number from string
  return number;
}

export default function CartScreen() {
  const [searchparms] = useSearchParams();
  const { productID } = useParams();
  const qty = searchparms.get("qty") || 1;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);

  //Remove Cart Handler function....


  const removeCartHandler = (id) => {
    //delete action 
    dispatch(removeFromCart(id));
  };

  //Check Out Handler Function...

  const checkOutHandler = () =>{
    navigate('/fusionmartfrontend/shipping');
  }

  return (
    <div className="container-fluid">
      <p className="h2" style={{textDecoration:'underline'}}>Shopping Cart</p>
      <div className="row">
        {cartItems.length > 0 ? (
          <div className="col-sm">
            {cartItems.map((product) => (
              <div
                className="card mb-3"
                style={{ maxWidth: "40em" }}
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
                      <div className="row" style={{ marginTop: "2em" }}>
                        <div className="col-sm">
                          <h6 className="card-text">Quantity</h6>
                          <select
                            className="form-select form-select-sm"
                            aria-label=".form-select-sm example"
                            defaultValue={product.qty}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div className="col-sm" style={{ padding: "20px" }}>
                          <h6 className="card-text">Price:{product.price}</h6>
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
        ) : (
          <MessageBox>Cart Is Empty --- <Link to="/fusionmartfrontend" className="alert-danger" style={{textDecoration:'none'}}>Go shopping</Link></MessageBox>
        )}
        <div className="col-sm-6">
          <div className="card" style={{ textAlign: "center" }}>
            <div className="card-body">
              <h5 className="card-title">Total</h5>
              <h6 className="card-text">
                Number of items:
                {cartItems.reduce((a, c) => a + Number(c.qty), 0)}
              </h6>
              <h6 className="card-text">
                Total Price: ₹
                {cartItems.reduce(
                  (a, c) => a + Number(c.qty) * extractNumber(c.price),
                  0
                )}
              </h6>
              <button className="btn btn-dark" onClick={checkOutHandler} disabled={cartItems.length === 0 ? true: false}>Proceed to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
