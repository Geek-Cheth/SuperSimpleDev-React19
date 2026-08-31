import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import { useSearchParams } from 'react-router';
import './HomePages.css';

export function HomePage({ cart, addToCart }) {

    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');


    // fetch('http://localhost:3000/api/products')
    //     .then((response) => {
    //         return response.json()
    //         }).then((data) => {
    //             console.log(data);
    //         });

    useEffect(() => {
        const getHomeData = async () => {
            let response;
            if (search) {
                response = await axios.get(`/api/products?search=${search}`);
            } else {
                response = await axios.get('/api/products');
            }
            setProducts(response.data);
        };

        getHomeData();
    }, [search]); // [] makes the useEffects run only once.

    return (
        <>
            <title>Ecommerce Project</title>

            <link rel='icon' href='/home-favicon.png' />
            <Header cart={cart} />
            <div className="home-page">
                <ProductsGrid products={products} addToCart={addToCart} />
            </div>
        </>
    );
}
