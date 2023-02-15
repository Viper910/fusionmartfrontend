export default function Review(props) {
  const { rating, numReviews } = props;
  return (
    <>
      <span>
        <i
          className={
            rating >= 1
              ? "fa fa-star"
              : rating <= 1.5
              ? "fa fa-star-half"
              : "fa fa-star-o"
          }
          aria-hidden="true"
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 1
              ? "fa fa-star"
              : rating <= 2.5
              ? "fa fa-star-half"
              : "fa fa-star-o"
          }
          aria-hidden="true"
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 2
              ? "fa fa-star"
              : rating <= 3.5
              ? "fa fa-star-half"
              : "fa fa-star-o"
          }
          aria-hidden="true"
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 3
              ? "fa fa-star"
              : rating <= 4.5
              ? "fa fa-star-half"
              : "fa fa-star-o"
          }
          aria-hidden="true"
        ></i>
      </span>
      <span>
        <i
          className={
            rating >= 4
              ? "fa fa-star"
              : rating <= 5
              ? "fa fa-star-half"
              : "fa fa-star-o"
          }
          aria-hidden="true"
        ></i>
      </span>
      <p>{numReviews} Review</p>
    </>
  );
}
