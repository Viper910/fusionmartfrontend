import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Product from "../Components/Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Components/Loader";
import MessageBox from "../Components/MessageBox";
import {carouselimagelist,listProduct} from "../ReduxStore/actions/productActions";

export default function Homescreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const carouselImageList = useSelector((state) => state.carouselImageList);
  const { imageList,imageloading } = carouselImageList;

  useEffect(() => {
    dispatch(carouselimagelist());  //InterChanging 21 and 22 number line create an error, Why????? Got the answer because 22number line set the loading false and its render the component results to error;
    dispatch(listProduct());
  }, [dispatch]);
  
  return (
    <>
      {loading||imageloading ? (
        <Loader />
      ) : error ? (
        <MessageBox>Page Not Found</MessageBox>
      ) : (
        <>
          <Carousel
            dynamicHeight={false}
            infiniteLoop={true}
            interval={3000}
            showStatus={false}
            showThumbs={false}
            showIndicators={false}
          >
            {imageList.map((image) => (
              <div key={image._id}>
                <img src={`${process.env.PUBLIC_URL}`+image.link} alt={image.link} />
              </div>
            ))}
          </Carousel>
          <div className="container">
            <div className="row">
              {products.map((product) => (
                <Product key={product._id} data={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
