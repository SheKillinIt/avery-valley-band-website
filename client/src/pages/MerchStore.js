import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MerchStore.css';

function MerchStore() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/merch');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item._id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="merch-page">
      <h1>🎵 Merch Store</h1>
      <div className="merch-container">
        <div className="products-section">
          <h2>Products</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            <div className="products-grid">
              {products.map(product => (
                <div key={product._id} className="product-card">
                  {product.image && <img src={product.image} alt={product.name} />}
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p className="price">${product.price.toFixed(2)}</p>
                  <button
                    className="btn"
                    onClick={() => addToCart(product)}
                    disabled={product.quantity === 0}
                  >
                    {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No products available yet.</p>
          )}
        </div>

        <div className="cart-section">
          <h2>Shopping Cart</h2>
          {cart.length > 0 ? (
            <>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item._id} className="cart-item">
                    <div>
                      <h4>{item.name}</h4>
                      <p>Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <h3>Total: ${total.toFixed(2)}</h3>
                <button className="btn">Checkout</button>
              </div>
            </>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default MerchStore;
