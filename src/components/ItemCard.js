import React from 'react';

const ItemCard = ({ item, handleAdd }) => {
  return (
    <div key={item.id} className="items-grid">
      <img src={item.img || "/default.jpg"} alt={item.service || "Item"} />
      <div className="subscription-details">
        <h4>{item.service}</h4>
        <p>{item.serviceInfo}</p>
        <p>${item.price.toFixed(2)}</p>
        <button onClick={() => handleAdd(item)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ItemCard;

