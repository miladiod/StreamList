import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem'; // Import the new CartItem component

const Cart = () => {
  const { cart, totalItems, totalPrice } = useCart();

  return (
    <main className="cart-container">
      <h2>Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} /> // Use the CartItem component
          ))}

          <hr />
          <div className="cart-summary">
            <h3>Total Items: {totalItems}</h3>
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          </div>
        </>
      )}
    </main>
  );
};

export default Cart;