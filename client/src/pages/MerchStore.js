import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MerchStore.css';

function MerchStore() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/merch');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <main className="merch-store">
      <div className="merch-header">
        <h1>Merch Store</h1>
        <p>Support the band by purchasing our exclusive merchandise!</p>
      </div>

      <div className="merch-container">
        <section className="products-section">
          <h2>Available Products</h2>
          <div className="products-grid">
            {products.length > 0 ? (
              products.map(product => (
                <div key={product._id} className="product-card">
                  {product.image && <img src={product.image} alt={product.name} />}
                  <h3>{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <p className="product-stock">{product.quantity > 0 ? `In Stock: ${product.quantity}` : 'Out of Stock'}</p>
                  <button
                    className="btn"
                    onClick={() => addToCart(product)}
                    disabled={product.quantity === 0}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p>No products available at the moment.</p>
            )}
          </div>
        </section>

        <section className="cart-section">
          <h2>Shopping Cart</h2>
          {cart.length > 0 ? (
            <>
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div>
                      <h4>{item.name}</h4>
                      <p>${item.price.toFixed(2)}</p>
                    </div>
                    <button
                      className="btn-remove"
                      onClick={() => removeFromCart(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="cart-total">
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
                <button className="btn">Proceed to Checkout</button>
              </div>
            </>
          ) : (
            <p className="empty-cart">Your cart is empty</p>
          )}
        </section>
      </div>
    </main>
  );
}

export default MerchStore;
