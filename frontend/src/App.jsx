import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddProduct from './components/AddProduct';
import ViewProducts from './components/ViewProduct';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Product Register</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/add">Add Product</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view">View All Products</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/add" element={<AddProduct />} />
          <Route path="/view" element={<ViewProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
