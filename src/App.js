import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About';
import './style.css';

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1>EZTechMovie</h1>
          <p><b>Welcome to EZTechMovie</b></p>
          <p>EZTechMovie is focus on popular mainstream movies, so online movie rentals are a fantastic alternative to streaming service subscriptions.</p>
          <nav id="nav_menu">
            <ul>
              <li id="first"><Link to="/">HOME</Link></li>
              <li><Link to="/movies">MOVIE</Link></li>
              <li><Link to="/cart">CART</Link></li>
              <li id="last"><Link to="/about">ABOUT</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<StreamList />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
