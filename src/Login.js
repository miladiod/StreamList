import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./components/AuthContext"; // adjust path as needed


export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ⬅️ this is the missing piece

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // ⬅️ update global context
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="login-screen">
      <h2>StreamList Login</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
}
