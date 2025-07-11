
import React, { useState } from 'react';
import { subscriptions, accessories } from "../data/Data";
import { useCart } from "../context/CartContext";

const SubscriptionList = () => {
  const { addToCart } = useCart(); // corrected usage
  const [warning, setWarning] = useState('');

  const handleAdd = (item) => {
    const result = addToCart(item);
    if (!result.success) {
      setWarning(result.message);
      setTimeout(() => setWarning(''), 3000);
    }
  };

  return (
    <div className="subscription-container">
      <h2 className="title">Subscriptions</h2>
      <div className="section-wrapper">
        
        {warning && <div className="subscription-warning">{warning}</div>}
        {subscriptions.map((item) => (
          <div key={item.id} className="items-grid">
            <img src={item.img || "/default.jpg"} alt={item.service || "Subscription"} />
            <div className="subscription-details">
              <h4>{item.service}</h4>
              <p>{item.serviceInfo}</p>
              <p>${item.price.toFixed(2)}</p>
              <button onClick={() => handleAdd(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="title">Accessories</h2>
      <div className="section-wrapper">
        
        {accessories.map((item) => (
          <div key={item.id} className="items-grid">
            <img src={item.img || "/default.jpg"} alt={item.service || "Accessory"} />
            <div className="subscription-details">
              <h4>{item.service}</h4>
              <p>{item.serviceInfo}</p>
              <p>${item.price.toFixed(2)}</p>
              <button onClick={() => handleAdd(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionList;

