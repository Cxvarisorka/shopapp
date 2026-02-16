import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/products', { credentials: 'include' });
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, price: Number(price), description }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create product');
      }

      setProducts((prev) => [data, ...prev]);
      setName('');
      setPrice('');
      setDescription('');
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch {
      alert('Failed to delete product');
    }
  }

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h2>Product Management</h2>
          <p>Create, view, and manage your store products</p>
        </div>

        {/* Create Product Form */}
        <div className="product-form-card">
          <h3>Add New Product</h3>
          {formError && <div className="error-msg">{formError}</div>}
          <form onSubmit={handleCreate}>
            <div className="form-row">
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Wireless Headphones"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Price ($)</label>
                <input
                  type="number"
                  placeholder="29.99"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  placeholder="Describe the product (10-500 characters)"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-success" disabled={submitting}>
                {submitting ? <span className="spinner" /> : 'Create Product'}
              </button>
            </div>
          </form>
        </div>

        {/* Products List */}
        <div className="products-section">
          <h3>All Products ({products.length})</h3>

          {loading ? (
            <div className="loading-container">
              <div className="spinner spinner-dark" />
            </div>
          ) : products.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h4>No products yet</h4>
              <p>Create your first product using the form above</p>
            </div>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product._id} className="product-card">
                  <div className="product-card-header">
                    <h4>{product.name}</h4>
                    <span className="product-price">${product.price}</span>
                  </div>
                  <p>{product.description}</p>
                  <div className="product-card-footer">
                    <span className="product-date">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
