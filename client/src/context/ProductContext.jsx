import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL;

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch(`${API_URL}/api/products`, { credentials: 'include' });
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  async function createProduct(name, price, description) {
    const res = await fetch(`${API_URL}/api/products`, {
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
    return data;
  }

  async function deleteProduct(id) {
    await fetch(`${API_URL}/api/products/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    setProducts((prev) => prev.filter((p) => p._id !== id));
  }

  return (
    <ProductContext.Provider value={{ products, loading, createProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
