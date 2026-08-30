import axios from 'axios';
import { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { OrderHeader } from './OrderHeader';
import { OrderDetails } from './OrderDetails';
import './OrdersPage.css';

export function OrdersPage({ cart }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function loadOrders() {
            const response = await axios.get('/api/orders?expand=products');
            setOrders(response.data);
        }

        loadOrders();
    }, []);

    return (
        <>
            <title>Orders</title>
            <link rel='icon' href='/orders-favicon.png' />
            <Header cart={cart}/>

            <div class="orders-page">
                <div class="page-title">Your Orders</div>

                <div class="orders-grid">
                    {orders.map((order) => {
                        return (
                            <div key={order.id} class="order-container">

                                
                                <OrderHeader order={order} />
                                <OrderDetails orderProducts={order.products} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </>

    )
}
