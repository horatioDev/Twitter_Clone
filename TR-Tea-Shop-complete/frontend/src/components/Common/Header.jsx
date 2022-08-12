// THIS FILE IS USED TO SET THE OUTPUT OF THE APP HEADER

// Import React, useEffect and useState from react
// useState and useEffect are used to set state and side effects of app
import React, { useEffect, useState } from "react";

// Import useDispatch from react redux
// useDispatch dispatches an action to make change to the store
import { useDispatch } from "react-redux";

// Import push from connected react router
// Push allows redirection to page passed as argument after it is called
import { push } from "connected-react-router";

// Import images needed for header and save to variables for easy use
import shoppingBag from '../../assets/img/shopping-bag.png'

// Import Sign out Async op from operations to be used in sign out func
import { signOut } from '../../reducks/users/operations'

// Import Link from ..

// Create react func that exports header to be used in app
function Header() {
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
    
    // Create a shop func that uses a dispatch action w/  push to redirect user to shopping cart page
    const shop = () => {
        // Dispatch so user is redirected to home page
        dispatch(push('/cart'))
    }

    // Create a sing out button func that dispatch sign-out operation/action if user signs out and  redirects user to sign in page
    const signOutButton = () => {
        // Dispatch w/ sign-out action to inform the store of the stat change
        dispatch(signOut());
        // Set user validation to false if user is logged out
        setCheckUser(false);
        // Dispatch to redirect to sign in page
        dispatch(push('/signin'))
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
        <header>
                <h1 onClick={home}>TR Tea Shop</h1>
                <nav>
                    {/* Check if User is valid and logged In; If they are set text to logout */}
                    {checkUser ? (
                        <span className="sign_in_link" onClick={signOutButton}>
                            logout
                        </span>
                        ) 
                        : // Else set it to sign in
                        (
                        <a href="/signin">
                            <span className="sign_in_link">
                                sign in
                            </span>
                        </a>
                        )
                    }
                    {/* If user is valid and logged in display shopping bag */}
                    {checkUser && (
                        <span class="shop_icon" onClick={shop}>
                            <img src={shoppingBag} alt='' />
                        </span>)}
                </nav>
        </header>
    </>
  )
}

export default Header