import { Route, Routes } from "react-router-dom";
import OrderTrackingOutput from "./Components/orderTrackingOutput";
import Account from "./pages/account";
import AddItem from "./pages/add_item";
import Checkout from "./pages/checkout";
import Home from "./pages/home";
import Item from "./pages/item";
import Order from "./pages/order";
import Product from "./pages/products";
import ShippingInfo from "./pages/shipping info";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import "./style.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/items/:item" element={<Item />} exact />
        <Route path="/checkout" element={<Checkout />} exact />
        <Route path="/shipping-info" element={<ShippingInfo />} exact />
        <Route path="/order" element={<Order />} exact />
        <Route
          path="/order-tracking/:userid/:ordernumber"
          element={<OrderTrackingOutput />}
          exact
        />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/account" element={<Account />} exact />
        <Route path="/products/:category/:brand" element={<Product />} exact />
        <Route path="/add-item" element={<AddItem />} exact />
      </Routes>
    </div>
  );
}

export default App;
