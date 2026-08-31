import { useState } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router';
import './Header.css';
import logoWhite from '../assets/logos/logo-white.png';
import mobileLogoWhite from '../assets/logos/mobile-logo-white.png';
import searchIcon from '../assets/icons/search-icon.png';
import cartIcon from '../assets/icons/cart-icon.png';

export function Header({ cart = [] }) {
    const [searchParams] = useSearchParams();
    const [searchText, setSearchText] = useState(
        searchParams.get('search') || ''
    );

    const navigate = useNavigate();
    let totalQuantity = 0;

    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    const handleSearch = () => {
        navigate(`/?search=${searchText}`);
    };

    return (
        <div className="header">
            <div className="left-section">
                <NavLink to="/" className="header-link">
                    <img className="logo"
                        src={logoWhite} />
                    <img className="mobile-logo"
                        src={mobileLogoWhite} />
                </NavLink>
            </div>

            <div className="middle-section">
                <input
                    className="search-bar"
                    type="text"
                    placeholder="Search"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                />

                <button className="search-button">
                    <img className="search-icon" src={searchIcon} onClick={handleSearch} />
                </button>
            </div>

            <div className="right-section">
                <NavLink className="orders-link header-link" to="/orders">

                    <span className="orders-text">Orders</span>
                </NavLink>

                <NavLink className="cart-link header-link" to="/checkout">
                    <img className="cart-icon" src={cartIcon} />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </NavLink>
            </div>
        </div>
    )
}
