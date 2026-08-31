import { useState } from "react";
import { formatMoney } from "../../utils/money";
import axios from "axios";

export function CartItemDetails({ cartItem, loadCart }) {
    const deleteCartItem = async () => {
        await axios.delete(`/api/cart-items/${cartItem.productId}`);
        loadCart();
    }

    const [isUpdating, setIsUpdating] = useState(false);
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const updateCartItem = async () => {
        if (isUpdating === true) {
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                quantity
            });
            await loadCart();
        }

        setIsUpdating(!isUpdating);
    };

    const handleQuantityKeyDown = async (event) => {
        if (event.key === 'Enter') {
            await updateCartItem();
        } else if (event.key === 'Escape') {
            setQuantity(cartItem.quantity);
            setIsUpdating(false);
        }
    };
    
    return (
        <>
            <img className="product-image"
                src={cartItem.product.image} />

            <div className="cart-item-details">
                <div className="product-name">
                    {cartItem.product.name}
                </div>
                <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                </div>
                <div className="product-quantity">
                    <span>
                        Quantity: <input
                            type="text"
                            className="checkout-cartItem-update-textbox"
                            value={quantity}
                            style={{ display: isUpdating ? 'inline-block' : 'none' }}
                            onChange={(event) => {
                                setQuantity(Number(event.target.value))
                            }}
                            onKeyDown={handleQuantityKeyDown}
                        /> <span className="quantity-label">{cartItem.quantity}</span>
                    </span>

                    <span className="update-quantity-link link-primary" onClick={updateCartItem}>
                        Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                        onClick={deleteCartItem}
                    >
                        Delete
                    </span>
                </div>
            </div>
        </>
    );
}
