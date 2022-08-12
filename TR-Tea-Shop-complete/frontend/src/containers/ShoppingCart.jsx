// THIS FILE IS USED TO DISPLAY MY SHOPPING CART

// Import React, useEffect and useState
import React, { useEffect, useState } from 'react';

// Import Cart Item
import CartItem from '../components/Common/CartItem';

// Import fetch user cart operation
import { fetchUserCart } from '../reducks/carts/operations';

// Import fetch user item operation
import { fetchUserItem } from '../reducks/items/operations';

// Import getCarts selector
import { getCarts, getSubtotal } from '../reducks/carts/selectors';

// Import useDispatch and useSelector hooks
import { useDispatch, useSelector } from 'react-redux';

// Import getUser selector
import { getUser } from '../reducks/users/selectors';

// Import getItems selector
import { getItems } from '../reducks/items/selectors';

// Import Cart Header selector
import CartHeader from '../components/Common/CartHeader';

const ShoppingCart = () => {
    // Set constants to variables use to select state nd allow change to that state
    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    // Set carts, user and items
    const carts = getCarts(selector);
    const user = getUser(selector);
    const subtotal = getSubtotal(selector);
    const items = getItems(selector);

    // Side effect to get carts and items
    useEffect(() => {
        dispatch(fetchUserItem());
        dispatch(fetchUserCart());
        // Log cart data
        console.log(carts);
        // return dependencies
        // eslint-disable-next-line
    }, []);
    return (
        <>
            <CartHeader />
            <div className="cart_container">
                <section class="shopping_cart">
                    <div class="cart_items">
                        <h2>Shopping Cart</h2>
                        {/* -- Table -- */}
                        <table class="table table-borderless">
                            <thead class="table_header">
                                <tr>
                                    <th class="product" scope="col">
                                        Product
                                    </th>
                                    <th class="quantity" scope="col">
                                        Quantity
                                    </th>
                                    <th class="price" scope="col">
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            {/* <CartItem /> */}
                            {
                                (carts.length > 0,
                                items &&
                                    carts.map(cart => (
                                        <li>
                                            <CartItem cart={cart} />
                                        </li>
                                    )))
                            }
                        </table>
                    </div>
                </section>
            </div>

            <div className="footer shipping">
                <h2>Subtotal ${subtotal}</h2>
                <a href="/order">
                    <button id="checkout_button">Checkout</button>
                </a>
            </div>
        </>
    );
};

export default ShoppingCart;
