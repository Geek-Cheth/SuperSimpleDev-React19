import './TrackingPage.css';
import axios from 'axios';
import { Header } from '../components/Header';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
    const { orderId, productId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        async function loadOrder(){
            const response = await axios.get(`/api/orders/${orderId}?expand=products`);
            setOrder(response.data);
            console.log(response.data);
        };
        loadOrder();
    }, [orderId]);

    if(!order){
        return null;
    }

    const orderProduct = order.products.find(
        (item) => item.productId == productId
    );

    if(!orderProduct) {
        return <p>Product not found in this order.</p>
    }

    const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimeMs;
    const timePassedMs = dayjs().valueOf() - order.orderTimeMs; // calculates the time passed since then
    const deliveryPercent = totalDeliveryTimeMs <= 0
        ? 100
        : Math.min(100, Math.max(0, (timePassedMs / totalDeliveryTimeMs) * 100));
    console.log(deliveryPercent);
    

    const currentStatus =
    deliveryPercent < 33
        ? 'preparing'
        : deliveryPercent < 100
            ? 'shipped'
            : 'delivered';

    return (
        <>
            <Header cart={cart} />

            <div className="tracking-page">
                <div className="order-tracking">
                    <a className="back-to-orders-link link-primary" href="/orders">
                        View all orders
                    </a>

                    <div className="delivery-date">
                        {deliveryPercent >= 100 ? 'Delivered on' : 'Arriving on'}{' '}
                        {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM, D')}
                    </div>

                    <div className="product-info">
                        {orderProduct.product.name}
                    </div>

                    <div className="product-info">
                        Quantity: {orderProduct.quantity}
                    </div>

                    <img className="product-image" src={orderProduct.product.image} />

                    <div className={`progress-labels-container `}>
                        <div className={`progress-label ${currentStatus === "preparing" && 'current-status'}`}>
                            Preparing
                        </div>
                        <div className={`progress-label ${currentStatus === "shipped" && 'current-status'}`}>
                            Shipped
                        </div>
                        <div className={`progress-label ${currentStatus === "delivered" && 'current-status'}`}>
                            Delivered
                        </div>
                    </div>

                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{width: `${deliveryPercent}%`}}>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
