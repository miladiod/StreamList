import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import './style.css';

import { CartProvider, CartContext } from "./context/CartContext";
import SubscriptionList from "./components/SubscriptionList";

import { AuthProvider, useAuth } from "./components/AuthContext"; // Import AuthProvider

import CreditCardForm from "./components/CreditCardForm";

// New component to encapsulate content that needs CartContext
function AppContent() {
  const { totalItems } = useContext(CartContext); // Get live cart count
  const { user, login, logout } = useAuth(); 

  return (
    <Router>
      <div>
        <header>
          <h1>EZTechMovie</h1>
          <p><b>Welcome to EZTechMovie</b></p>
          <p>EZTechMovie is focus on popular mainstream movies, so online movie rentals are a fantastic alternative to streaming service subscriptions.</p>
          <nav id="nav_menu">
            <ul>
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/movies">MOVIE</Link></li>
               <li ><Link to="/subscriptions">SUBSCRIPTIONS</Link></li>
              <li><Link to="/cart">CART({totalItems})</Link></li>
              <li ><Link to="/about">ABOUT</Link></li>
             



              <li >
                 {user ? (
                  <button className="OAuth1" onClick={logout}>Logout</button>
                ) : (
                  <button className="OAuth2" onClick={login}>Login with Google</button>
                )}
                
              </li>


            </ul>
          </nav>
        </header>


        <main>
          <Routes>
            <Route path="/" element={<StreamList />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/subscriptions" element={<SubscriptionList />} />
            <Route path="/credit-card" element={<CreditCardForm />} />
          
          </Routes>
        </main>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;