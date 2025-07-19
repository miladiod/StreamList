
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px" }}>
      <Link to="/">Home</Link>
      <Link to="/subscriptions">Subscriptions</Link>
      <Link to="/cart">Cart ({itemCount})</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}
