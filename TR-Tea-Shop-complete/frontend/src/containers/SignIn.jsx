// THIS FILE IS USED TO SET THE SIGN IN OUTPUT OF THE APP HEADER

// Import React, and useState from react
// useState and are used to set state and side effects of app
import React, { useState } from "react";

// Import useDispatch from react redux
// useDispatch dispatches an action to make change to the store
import { useDispatch } from "react-redux";

// Import push from connected react router
// Push allows redirection to page passed as argument after it is called
import { push } from "connected-react-router";

// Import images needed for header and save to variables for easy use
import bigX from '../assets/img/bg_close.png'

// Import Sign in Async op from operations to be used in sign out func

import { signIn } from '../reducks/users/operations'

// Import Home from containers
import Home from "../containers/Home";

// Create react arrow func that exports sign in to be used in app
const SignIn = () => {
    // Create dispatch const that holds dispatch func to allows changes to the store
    const dispatch = useDispatch();

    // Create a close button func that uses a dispatch action w/  push to redirect user to home page
    const closeButton = () => {
        dispatch(push('/'));
    }

    // Set default state to empty strings for email and password
    const [email, setEmail] = useState(''),
        [password, setPassword] = useState('');

    // Save user's data: Email
    const inputEmail = event => {
        // Set user's data
        setEmail(event.target.value)
    }
    
    // Save user's data: Password
    const inputPassword = event => {
        // Set user's data
        setPassword(event.target.value)
    }

    // Create a sign in button func that dispatches w/ sign in action as a parameter that takes in user data: username, email, password and saves changes to store/state then resets to empty strings
    const signInButton = () => {
        // Dispatch SignIn func w/ parameters that will inform the store what will be changed when sign in button is called
        dispatch(signIn( email, password));
        // Reset
        setEmail('');
        setPassword('');
    };
  return (
    <>
        <div className="tea_shop_wrapper">
            {/* -- Overlay -- */}
            <div className="overlay"></div>
            {/* -- Sign In Page -- */}
            <div className="sign_in_container">
                {/* -- Close icon -- */}
                <img className="bg_close" src={bigX} alt="" onClick={closeButton}/>
                <div className="header">
                    <h3>TR Tea Shop</h3>
                    <h2>sign in</h2>
                </div>
                <div className="sign_in_input">
                    <input 
                        type="email"
                        className="email" 
                        placeholder="Email address" 
                        // User's input
                        onChange={inputEmail}
                        // Set value to user's input
                        value={email} required
                    />

                    <input 
                        type="password" 
                        className="password" 
                        placeholder="Password" 
                        // User's input
                        onChange={inputPassword}
                        // Set value to user's input
                        value={password} required
                    />
                </div>
                <div className="sign_in_button">
                    <button className="sign_in" onClick={signInButton}>sign in</button>
                </div>
                <div className="sign_in_footer">
                    <p className="text">Not a Member?</p>
                    <a className="link" href="/signup">join us.</a>
                </div>
            </div> 
            {/* Home Container */}
            <Home />
        </div>
    </>
  )
}


export default SignIn;