import dayjs from "dayjs";
import axios from "axios";
import { DeliveryOptions } from "./DeliveryOptions";
import { formatMony } from "../../utils/mony";
import { useState } from "react";
export function CartItemDetails({ cartItem, deliveryOptions, getCartData }) {
  const [updated, setUpdated] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const updateDeliveryOption = async () => {
    await axios.put(`/api/cart-items/${cartItem.productId}`, {
      quantity,
    });
    await getCartData();
  };
  const updateItem = () => {
    if (updated === false) {
      setUpdated(true);
    } else {
      setUpdated(false);
      updateDeliveryOption();
    }
  };

  const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
    return deliveryOption.id === cartItem.deliveryOptionId;
  });
  const deleteItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await getCartData();
  };
  return (
    <div className="cart-item-container">
      <div className="delivery-date">
        Delivery date:{" "}
        {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
          "dddd, MMM D"
        )}
      </div>

      <div className="cart-item-details-grid">
        <img className="product-image" src={cartItem.product.image} />

        <div className="cart-item-details">
          <div className="product-name">{cartItem.product.name}</div>
          <div className="product-price">
            {formatMony(cartItem.product.priceCents)}
          </div>
          <div className="product-quantity">
            <span>
              Quantity:{" "}
              <input
                type="number"
                className="update-quantity"
                value={quantity}
                onChange={(e) => {
                  const selectedQuantity = Number(e.target.value);
                  setQuantity(selectedQuantity);
                }}
                style={{ display: updated ? "inline-block" : "none" }}
              />
              <span className="quantity-label">{cartItem.quantity}</span>
            </span>
            <span
              className="update-quantity-link link-primary"
              onClick={updateItem}
            >
              Update
            </span>
            <span
              className="delete-quantity-link link-primary"
              onClick={deleteItem}
            >
              Delete
            </span>
          </div>
        </div>
        <DeliveryOptions
          cartItem={cartItem}
          deliveryOptions={deliveryOptions}
          getCartData={getCartData}
        />
      </div>
    </div>
  );
}
