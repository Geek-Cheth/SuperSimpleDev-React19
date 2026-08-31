import { HomePage } from './Pages/home/HomePage';
import axios from 'axios';
import { Routes, Route } from 'react-router';
import { CheckoutPage } from './Pages/checkout/CheckoutPage';
import { OrdersPage } from './Pages/orders/OrdersPage';
import { TrackingPage } from './Pages/TrackingPage';
import { NotFoundPage } from './Pages/NotFoundPage';
import './App.css'
import { useEffect, useState } from 'react';

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product');
    setCart(response.data);
  };

  const addToCart =
    async (productId, quantity = 1) => {
      await axios.post('/api/cart-items', {
        productId,
        quantity
      });
      await loadCart();
    };

  useEffect(() => {
    loadCart();
  }, []);




  return (
    <Routes>
      <Route index element={<HomePage cart={cart} addToCart={addToCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} loadCart={loadCart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} addToCart={addToCart} />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  )
}

export default App
