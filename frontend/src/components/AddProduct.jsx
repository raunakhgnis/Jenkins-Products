import React, { useState } from 'react';
import axios from 'axios';
import config from './config.js'; // import your config

const AddProduct = () => {
  const [product, setProduct] = useState({ name: '', price: '', description: '' });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      await axios.post(`${config.url}/api/products`, product);

      alert('Product added successfully');
      setProduct({ name: '', price: '', description: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to add product'); // better error handling
    }
  };

  return (
    <div className="card p-4">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" className="form-control" name="price" value={product.price} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={product.description} onChange={handleChange}></textarea>
        </div>
        <button className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
