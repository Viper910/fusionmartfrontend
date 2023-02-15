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
        <Route path="/" element={<Homescreen />} exact />
        <Route path="/product/:id" element={<Productscreen />} />
        <Route path="/cart" element={<CartScreen/>}/>
        <Route path="/cart/:productID" element={<CartScreen/>}/>
        <Route path="/signin" element={<SigninScreen/>}/>
        <Route path="/register" element={<RegisterScreen/>}/>
        <Route path="/shipping" element={<ShippingScreen/>}/>
        <Route path="/payment" element={<PaymentScreen/>}/>
        <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
        <Route path="/placeorder/:orderId" element={<OrderScreen/>}/>
        <Route path="/orderhistory" element={<OrderHistoryScreen/>}/>
      </Routes>
      <Footer />
    </div>
  ); 
}

export default App;
