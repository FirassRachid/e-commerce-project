import { CartItemDetails } from "./CartItemDetails";
export function OrderSummary({ cart, deliveryOptions, getCartData }) {
  return (
    <div className="order-summary">
      {deliveryOptions.length > 0 &&
        cart.map((cartItem) => {
          return (
            <CartItemDetails key={cartItem.id} cartItem ={cartItem} deliveryOptions={deliveryOptions} getCartData={getCartData} />
          );
        })}
    </div>
  );
}
