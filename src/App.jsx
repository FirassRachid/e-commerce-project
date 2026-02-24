import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { HomePage } from "./componants/HomePage/HomePage";
import { Orders } from "./componants/Orders/Orders";
import { Checkout } from "./componants/Checkout/Checkout";
import { Tracking } from "./componants/Tracking/Tracking";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const getCartData = async () => {
    const response = await axios.get(`/api/cart-items?expand=product`);
    setCart(response.data);
  };

  useEffect(() => {
    getCartData();
  }, []);
  return (
    <>
      <Routes>
        <Route
          index
          element={<HomePage cart={cart} getCartData={getCartData} />}
        />
        <Route
          path="orders"
          element={<Orders cart={cart} getCartData={getCartData} />}
        />
        <Route
          path="checkout"
          element={<Checkout cart={cart} getCartData={getCartData} />}
        />
        <Route
          path="tracking/:orderId/:productId"
          element={<Tracking cart={cart} />}
        />
      </Routes>
    </>
  );
}

export default App;
