import axios from "axios";
import { useEffect, useState } from "react";
import { CheckoutHeader } from "./CheckoutHeader";
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import "./checkout.css";
export function Checkout({ cart, getCartData }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get(
        `/api/delivery-options?expand=estimatedDeliveryTime`
      );
      setDeliveryOptions(response.data);

      response = await axios.get(`/api/payment-summary`);
      setPaymentSummary(response.data);
    };

    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/payment-summary`);
      setPaymentSummary(response.data);
    };
    getData();
  }, [cart]);

  return (
    <>
      <title>Checkout</title>

      <CheckoutHeader cart={cart} />
      <div className="checkout-page">
        <div className="page-title">Review your order :</div>

        <div className="checkout-grid">
          <OrderSummary
            cart={cart}
            deliveryOptions={deliveryOptions}
            getCartData={getCartData}
          />

          <PaymentSummary
            paymentSummary={paymentSummary}
            getCartData={getCartData}
          />
        </div>
      </div>
      <p className="conact-me">
        By{" "}
        <a href="mailto:firassrachid2000@gmail.com" target="_blank">
          Firass Rachid
        </a>
        {" _ "}
        <a
          href="https://api.whatsapp.com/send?phone=963937898507"
          target="_blank"
        >
          whatsapp
        </a>
      </p>
    </>
  );
}
