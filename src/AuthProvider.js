import { AuthProvider } from "./AuthContext";
// ...existing code...
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}