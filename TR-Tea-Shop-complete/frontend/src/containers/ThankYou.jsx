// THIS FILE IS USED TO SET THE THANK YOU PAGE OUTPUT OF THE APP 


// Import React and useEffect from react
// useEffect is used to side effects of app
import React, { useEffect } from "react";

// Import useDispatch and useSelector from react redux
// useDispatch dispatches an action to make change to the store
// useSelector
import { useDispatch, useSelector } from "react-redux";

// Import getUser selector
// import { getUser } from '../reducks/users/selectors';

// Import push from connected react router
// Push allows redirection to page passed as argument after it is called
import { push } from "connected-react-router";

// Import Header from components
import Header from "../components/Common/Header";


const ThankYou = () => {
    // Create selector variable to hold value of state
    // const selector = useSelector(state => state);
    // Create dispatch variable that informs the store of what ...
    const dispatch = useDispatch();
    // Set user variable to user's login key from local storage parsed
    const user = JSON.parse(localStorage.getItem('LOGIN_USER_KEY'));

    // Create side effect that logs user
    useEffect(() => {
        console.log(user);
    // eslint-disable-next-line
    }, [])
  return (
    <>
        <div className="thank_you_container">
            <Header />
            <section class="showcase">
                    <div class="introduction">
                        {/* Add user's name to salutation */}
                        <h1>- Thank you for ordering -</h1>
                    </div>
            </section>
            <section class="thank_you_message">
                    <div class="message">
                        <p>Thank you for ordering. We received your request. 
                        <br />
                        <br />
                        Our stuff will be contacting with you to tell next steps.</p>
                        <a href="/">
                            {/* Enable onClick func that dispatches push method to redirect to home page when button is clicked */}
                            <button onClick={() => dispatch(push('/'))}>Back to Home</button>
                        </a>
                    </div>
            </section>
        </div>
    </>
  )
}

export default ThankYou