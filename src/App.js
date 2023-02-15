import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";
import CartScreen from "./Screens/CartScreen";
import Homescreen from "./Screens/HomeScreen";
import OrderHistoryScreen from "./Screens/OrderHistoryScreen";
import OrderScreen from "./Screens/OrderScreen";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import Productscreen from "./Screens/Productscreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import SigninScreen from "./Screens/SigninScreen";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/fusionmartfrontend" element={<Homescreen />} exact />
        <Route path="/fusionmartfrontend/product/:id" element={<Productscreen />} />
        <Route path="/fusionmartfrontend/cart" element={<CartScreen/>}/>
        <Route path="/fusionmartfrontend/cart/:productID" element={<CartScreen/>}/>
        <Route path="/fusionmartfrontend/signin" element={<SigninScreen/>}/>
        <Route path="/fusionmartfrontend/register" element={<RegisterScreen/>}/>
        <Route path="/fusionmartfrontend/shipping" element={<ShippingScreen/>}/>
        <Route path="/fusionmartfrontend/payment" element={<PaymentScreen/>}/>
        <Route path="/fusionmartfrontend/placeorder" element={<PlaceOrderScreen/>}/>
        <Route path="/fusionmartfrontend/placeorder/:orderId" element={<OrderScreen/>}/>
        <Route path="/fusionmartfrontend/orderhistory" element={<OrderHistoryScreen/>}/>
      </Routes>
      <Footer />
    </div>
  ); 
}

export default App;
