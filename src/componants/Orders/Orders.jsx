import axios from "axios";
import dayjs from "dayjs";
import { Fragment } from "react";
import { formatMony } from "../../utils/mony";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Header } from "../Header/Header";
import "./orders.css";
export function Orders({ cart, getCartData }) {
  const [orders, setOrders] = useState([]);
  const resetData = async () => {
    await axios.post(`/api/reset`);
    getCartData();
  };
  useEffect(() => {
    const getOrdresData = async () => {
      const response = await axios.get(`/api/orders?expand=products`);
      setOrders(response.data);
      console.log(response.data);
    };
    getOrdresData();
  }, []);
  return (
    <>
      <title>Orders</title>

      <Header cart={cart} />
      <div className="orders-page">
        <div className="page-title">Your Orders :</div>
        <button className="button-primary" onClick={resetData}>
          Default data
        </button>
        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format("MMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMony(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((OrderProduct) => {
                    const addToCart = async () => {
                      await axios.post(`/api/cart-items?`, {
                        productId: OrderProduct.product.id,
                        quantity: OrderProduct.quantity,
                      });
                      await getCartData();
                    };

                    return (
                      <Fragment key={OrderProduct.product.id}>
                        <div className="product-image-container">
                          <img
                            src={OrderProduct.product.image}
                          />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {OrderProduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on:{" "}
                            {dayjs(OrderProduct.estimatedDeliveryTimeMs).format(
                              "MMM D"
                            )}
                          </div>
                          <div className="product-quantity">
                            Quantity: {OrderProduct.quantity}
                          </div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src={`/images/icons/buy-again.png`}
                            />

                            <span
                              className="buy-again-message"
                              onClick={addToCart}
                            >
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <Link
                            to={`/tracking/${order.id}/${OrderProduct.product.id}`}
                          >
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}
                </div>
              </div>
            );
          })}
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
