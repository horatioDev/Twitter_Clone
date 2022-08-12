// THIS FILE IS USED TO SET THE HOME PAGE OUTPUT OF THE APP

// Import React, useEffect and useState from react
// useState and useEffect are used to set state and side effects of app
import React, { useEffect } from 'react';
import { getCarts, getSubtotal } from '../reducks/carts/selectors';

// Import useDispatch and useSelector from react redux
// useDispatch dispatches an action to make change to the store
// useSelector
import { useDispatch, useSelector } from 'react-redux';

// Import images needed for header and save to variables for easy use
import showcase from '../assets/img/showcase.png';

// Import items from selectors
import { getItems } from '../reducks/items/selectors';

// Import fetchItem and fetchCarts from operations
import { fetchUserItem } from '../reducks/items/operations';
import { fetchUserCart } from '../reducks/carts/operations';

// Import Item component for use in Home func
import Item from '../components/Common/Item';
import Header from '../components/Common/Header';

// Create and export Home arrow func
const Home = () => {
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const items = getItems(selector);
    const subtotal = getSubtotal(selector);

    useEffect(() => {
        // Dispatch fetch item action
        dispatch(fetchUserItem());
        // Check if user has a valid login key
        if (localStorage.getItem('LOGIN_USER_KEY')) {
            // Dispatch fetch user cart action
            dispatch(fetchUserCart());
            // Console log item/s
            console.log(items);
        }
        // // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (localStorage.getItem('LOGIN_USER_KEY')) {
            // Dispatch fetch user cart action
            dispatch(fetchUserCart());
        }
        // // eslint-disable-next-line
    }, []);

    return (
        <>
            <Header />
            <div className="tea_shop_container">
                <section class="showcase">
                    <img src={showcase} alt="Tea cup" />
                </section>
            </div>
            {items && items.length > 0 && items.map(item => <Item key={item.id} item={item} />)}
            <div className="footer">
                <h2>Subtotal: ${subtotal}</h2>
                <a href="/cart">
                    <button id="check_cart_button">Check your Cart</button>{' '}
                </a>
            </div>
        </>
    );
};

export default Home;
