// THIS FILE IS USED TO SET THE OUTPUT OF THE TEA SHOP: CART HEADER

// Import React, useEffect and useState from react
// useState and useEffect are used to set state and side effects of app
import React, { useEffect, useState } from "react";

// Import useDispatch from react redux
import { useDispatch } from "react-redux";

// Import push from connected react router
// Push allows redirection to page passed as argument after it is called
import { push } from "connected-react-router";

// Import images needed for header and save to variables for easy use
import logo from '../../assets/img/tea.png'
import search from '../../assets/img/search.png'
import shoppingCart from '../../assets/img/cart.png'
import user from '../../assets/img/user.png'
import Header from "./Header";

// Import Link from ..

// Create react func that exports header to be used in app
function CartHeader() {
    // Create dispatch const that holds dispatch func to allows changes to the store
    const dispatch = useDispatch();

    // Create key const that holds user's login key from local storage
    const userKey = localStorage.getItem('LOGIN_USER_KEY');

    // Create initial state of user to empty
    const [checkUser, setCheckUser] = useState(false);

    // Create a home func that uses a dispatch action w/  push to redirect user to home page
    const home = () => {
        // Dispatch so user is redirected to home page
        dispatch(push('/'))
    }
    
    // Create a checkout func that uses a dispatch action w/  push to redirect user to shipping details page
    const checkout = () => {
        // Dispatch so user is redirected to home page
        dispatch(push('/order'))
    }

    
    // Set effect if user is signed in user validation is set to true
    useEffect(() => {
        // Check if user is logged/signed in and user key is not empty
        if (userKey !== null) {
            // If user key is present, set user validation to true
            setCheckUser(true);
        }
       // Return dependencies 
    }, [userKey]) 


  return (
    <>
        <header className="cart_header">
            <div className="tea_logo" onClick={home}>
                <span className="title_logo">
                    <img src={logo}alt="Tea Cup logo"  />
                    TR Tea Shop
                </span>
            </div>
            <nav>
                {/* Check if User is valid and logged In; If they are set text to logout */}
                    {/* NEED TO VALIDATE */}
                {/* <-- Search -->  */}
                {/* <-- Shopping Cart --> */}
                {/* <-- User Icon --> */}
                {checkUser ? (
                    <>
                        <span className="search_icon" href="#">
                            <img src={search} alt="Magnifying Glass Icon" />
                        </span>

                        <span className="shopping_cart_icon">
                            <img src={shoppingCart} alt="Shopping Cart icon" onClick={checkout} />
                        </span>

                        <span className="user_icon" href="#">
                            <img src={user} alt="User icon" />
                        </span>
                    </>
                ) : (
                    <Header />
                )}
                
            </nav>
        </header>
    </>
  )
}

export default CartHeader