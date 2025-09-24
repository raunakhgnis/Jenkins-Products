import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from './config.jsx';  // import the config

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get(`${config.url}/api/products`);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`${config.url}/api/products/${id}`);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = async () => {
    await axios.put(`${config.url}/api/products/${editingProduct.id}`, editingProduct);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleSearch = async () => {
    if (!searchId) return fetchProducts();
    const res = await axios.get(`${config.url}/api/products/${searchId}`);
    setProducts(res.data ? [res.data] : []);
  };

  return (
    <div>
      <h2>Products</h2>
      <div className="mb-3 d-flex">
        <input type="number" className="form-control me-2" placeholder="Search by ID" value={searchId} onChange={e => setSearchId(e.target.value)} />
        <button className="btn btn-secondary me-2" onClick={handleSearch}>Search</button>
        <button className="btn btn-info text-white" onClick={fetchProducts}>Refresh</button>
      </div>

      {editingProduct && (
        <div className="card p-3 mb-3">
          <h5>Update Product ID: {editingProduct.id}</h5>
          <input className="form-control mb-2" value={editingProduct.name} onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })} />
          <input className="form-control mb-2" type="number" value={editingProduct.price} onChange={e => setEditingProduct({ ...editingProduct, price: e.target.value })} />
          <textarea className="form-control mb-2" value={editingProduct.description} onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}></textarea>
          <button className="btn btn-success" onClick={handleUpdate}>Update</button>
        </div>
      )}

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.description}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;
