import { accessories } from "../data/Data";
import { useCart } from "../context/CartContext";

export default function AccessoryList() {
  const { addToCart } = useCart();

  return (
    <div>
      <h3>Accessories</h3>
      {accessories.map(item => (
        <div key={item.id}>
          <p>{item.name} - ${item.price}</p>
          <button onClick={() => addToCart(item)}>Add</button>
        </div>
      ))}
    </div>
  );
}
