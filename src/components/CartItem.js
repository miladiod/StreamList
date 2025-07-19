import React from 'react';
import { useCart } from '../context/CartContext'; // Assuming CartContext is in this path

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const isSubscription = (cartItem) => cartItem.service.toLowerCase().includes('subscription');

  return (
    <div className="cart-item">
      <img src={item.img} alt={item.service} width="100" style={{ marginRight: '1rem' }} />
      <div className="cart-details">
        <h4>{item.service}</h4>
        <p>Price: ${item.price.toFixed(2)}</p>

        {!isSubscription(item) ? (
          <>
            <label htmlFor={`qty-${item.id}`}>Quantity:</label>
            <input
              id={`qty-${item.id}`}
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
            />
          </>
        ) : (
          <p>Quantity: 1 (subscriptions are limited)</p>
        )}
      </div>

      <button onClick={() => removeFromCart(item.id)}>Remove</button>
    </div>
  );
};

export default CartItem;
