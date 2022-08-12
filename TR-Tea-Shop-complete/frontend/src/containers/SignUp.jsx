// THIS FILE IS USED TO SET THE SIGN UP OUTPUT OF THE APP HEADER

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

// Import Sign up Async op from operations to be used in sign out func

import { signUp } from '../reducks/users/operations'

// Import Home from containers
import Home from "../containers/Home";


// Create react arrow func that exports sign up to be used in app
const SignUp = () => {
    // Create dispatch const that holds dispatch func to allows changes to the store
    const dispatch = useDispatch();

    // Create a close button func that uses a dispatch action w/  push to redirect user to home page
    const closeButton = () => {
        dispatch(push('/'));
    }

    // Set default state to empty strings for username, email and password
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Save user's data: Username
    const inputUserName = event => {
        // Set user's data
        setUserName(event.target.value)
    }

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

    // Create a sign up button func that dispatches w/ sign up action as a parameter that takes in user data: username, email, password and saves changes to store/state then resets to empty strings
    const signUpButton = () => {
        // Dispatch SignUp func w/ parameters that will inform the store what will be changed when sign up button is called
        dispatch(signUp(username, email, password));
        // Reset
        setUserName('');
        setEmail('');
        setPassword('');
    };
  return (
    <>
        <div className="tea_shop_wrapper">
            {/* -- Overlay -- */}
            <div className="overlay"></div>
            {/* -- Sign Up Page -- */}
            <div className="sign_up_container">
                {/* -- Close icon -- */}
                <img className="bg_close" src={bigX} alt="" onClick={closeButton} />
                <div className="header">
                    <h3>TR Tea Shop</h3>
                    <h2>sign up</h2>
                </div>

                <div className="sign_up_input">
                    <input
                        type="text" 
                        className="user" 
                        placeholder="User Name"
                        // User's input
                        onChange={inputUserName}
                        // Set value to user's input
                        value={username} required
                    />

                    <input 
                        type="email" 
                        className="email" 
                        placeholder="Email Address" 
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

                <div className="sign_up_button">
                    <button className="sign_up" onClick={signUpButton}>sign up</button>
                </div>
                <div className="sign_up_footer">
                    <p className="text">Already a Member?</p>
                    <a className="link" href="/signin">sign in</a>
                </div>
            </div>
            {/* Home Container */}
            <Home />
        </div>
    </>
  )
}


export default SignUp;