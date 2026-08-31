import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePages.css';

export function HomePage({ cart, addToCart }) {

    const [products, setProducts] = useState([]);


    // fetch('http://localhost:3000/api/products')
    //     .then((response) => {
    //         return response.json()
    //         }).then((data) => {
    //             console.log(data);
    //         });

    useEffect(() => {
        const getHomeData = async () => {
            const response = await axios.get('/api/products')
            setProducts(response.data);
        };

        getHomeData();
    }, []); // [] makes the useEffects run only once.

    return (
        <>
            <title>Ecommerce Project</title>

            <link rel='icon' href='/home-favicon.png' />
            <Header cart={cart} />
            <div className="home-page">
                <ProductsGrid products={products} addToCart={addToCart}/>
            </div>
        </>
    );
}
