import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from './config.jsx'; // config.url should be like "http://localhost:5656/api/products"

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${config.url}`);
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${config.url}/delete/${id}`);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product');
    }
  };

  // Edit product (set to form)
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  // Update product
  const handleUpdate = async () => {
    if (!editingProduct) return;

    try {
      await axios.put(`${config.url}/update/${editingProduct.id}`, {
        ...editingProduct,
        price: parseFloat(editingProduct.price),
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error('Error updating product:', err);
      alert('Failed to update product');
    }
  };

  // Search product by ID
  const handleSearch = async () => {
    if (!searchId) return fetchProducts();
    try {
      const res = await axios.get(`${config.url}/get/${searchId}`);
      setProducts(res.data ? [res.data] : []);
    } catch (err) {
      console.error('Product not found:', err);
      setProducts([]);
    }
  };

  return (
    <div>
      <h2>Products</h2>

      {/* Search Bar */}
      <div className="mb-3 d-flex">
        <input
          type="number"
          className="form-control me-2"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button className="btn btn-secondary me-2" onClick={handleSearch}>
          Search
        </button>
        <button className="btn btn-info text-white" onClick={fetchProducts}>
          Refresh
        </button>
      </div>

      {/* Edit Form */}
      {editingProduct && (
        <div className="card p-3 mb-3">
          <h5>Update Product ID: {editingProduct.id}</h5>
          <input
            className="form-control mb-2"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, name: e.target.value })
            }
          />
          <input
            className="form-control mb-2"
            type="number"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({ ...editingProduct, price: e.target.value })
            }
          />
          <textarea
            className="form-control mb-2"
            value={editingProduct.description}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                description: e.target.value,
              })
            }
          ></textarea>
          <button className="btn btn-success" onClick={handleUpdate}>
            Update
          </button>
          <button
            className="btn btn-secondary ms-2"
            onClick={() => setEditingProduct(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Products Table */}
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
          {products?.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.description}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProducts;
