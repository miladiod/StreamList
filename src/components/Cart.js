import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem'; // Import the new CartItem component
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <main className="cart-container">
      <h2>Shopping Cart</h2>
       {/* ...existing cart UI... */}
      <button className='checkout' onClick={() => navigate("/credit-card")}>
        Proceed to checkout
      </button>

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