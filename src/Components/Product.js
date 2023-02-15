import { Link } from "react-router-dom";
import Review from "./Review";

export default function Product({ data }) {
  const linkclass = { color: "black", textDecoration: "none" };
  console.log();
  return (
    <div className="col-sm" style={{ margin: "10px" }}>
      <div className="card" style={{ width: "18rem", textAlign: "center" }}>
        <Link to={`/product/${data._id}`}>
          <img
            style={{ height: "24em" }}
            src={`${process.env.PUBLIC_URL}`+data.image}
            className="card-img-top"
            alt={data.name}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title">{data.brand}</h5>
          <Link to={`/product/${data._id}`} style={linkclass}>
            <p className="card-text">{data.name}</p>
          </Link>
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Review rating={data.rating} numReviews={data.numReviews} />
          </li>
          <li className="list-group-item">{data.price}</li>
        </ul>
      </div>
    </div>
  );
}
