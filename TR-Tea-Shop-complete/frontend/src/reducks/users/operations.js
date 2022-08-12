// THIS FILE IS USED FOR ASYNC / DATA FETCHING

// Import API 
import API from '../../API';

// Import USER: Sign-In, Sign-Up, Sign-Out from Actions.js
import { userSignIn, userSignUp, userSignOut } from '../users/actions';

// Import push used to redirect router
import { push } from 'connected-react-router'

// Variable instance to hold API func
const api = new API();

// Create string constant
const LOGIN_USER_KEY = 'LOGIN_USER_KEY';

// Create function that retrieves user data/info from locale storage and returns an async func 
export const fetchUserFromLocalStorage = () => {
    // Return async w/ dispatch as a parameter
    return async (dispatch) => {
        // Variable to  save/hold user JSON data/info retrieved from local storage by login key reference
        const userJSON = localStorage.getItem(LOGIN_USER_KEY);
        // Check if user JSON data has a token and not an empty string
        if (userJSON &&  userJSON.token !== '') {
            // Dispatch action that takes in  sign in as parameter w/ user JSON data parsed as an argument; that informs the store of what changes were made or wants to make to the state of app when sign-in is called
            dispatch(signIn(JSON.parse(userJSON)));
        }
    };
};


// Create a sign-up function that register user data/info and returns an async func if validated and ...
export const signUp = (username, email, password) => {
    // Return async func w/ dispatch as args
    return async (dispatch) => {
        // Check if username, email, password is not an empty string
        // Validate
        if (username === '' || email === '' || password === '') {
            // Send alert
            alert('Please fill in username , email and password.');
            // return false: Will return true if args are valid, else it will return false
            return false;
        }
        
        // Return api data/info ...
        // Then if data/info is valid
        // Dispatch action that takes in  sign up as parameter w/ user as an argument; that sets user info and informs the store of what changes were made or wants to make to the state of app when sign-up is called
        // When sign-up is called the data is stored in local storage memory by user login key and converts user json info/data to string format
        return api.signUp(username, email, password)
        .then((user) => {
            dispatch(userSignUp(user));
            localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(user));
            // Dispatch an action that returns/redirects user to the home page
            dispatch(push('/'));
        })
        .catch((error) => {
            // Catch if data is not valid an alert error
            alert('Failed to connect to API to add user');
            // Console log error WHY??
            console.log(error)
        })
    };
};


// Create a sign-in function that logs user data/info and returns an async func if validated and ...
// Return async func w/ dispatch as args
// Check if  email and password is not an empty string
export const signIn = (email, password) => {
    return async (dispatch) => {
        // Validate
        if (email === '' || password === '') {
            // Send alert
            alert('Please fill in email and password.');
            // return false: Will return true if args are valid, else it will return false
            return false;
        }
        
        // Return api data/info ...
        // Then if data/info is valid
        // Dispatch action that takes in  sign up as parameter w/ user as an argument; that sets user info and informs the store of what changes were made or wants to make to the state of app when sign-in is called
        // When sign-up is called the data is stored in local storage memory by user login key and converts user json info/data to string format
        return api
        .signIn(email, password)
        .then((user) => {
            dispatch(userSignIn(user));
            localStorage.setItem(LOGIN_USER_KEY, JSON.stringify(user));
            // Dispatch an action that returns/redirects user to the home page
            dispatch(push('/'));
        })
        .catch((error) => {
            // Catch if data is not valid an alert error
            alert('Failed to connect to API to log user');
            // Console log error WHY??
            console.log(error)
        })
    }
};



// Create a sign-out function that logs out user data/info and returns an async func if validated and ...
// Return async func w/ dispatch as a parameter 
// Dispatch w/ sign-out action as a parameter that informs the store to remove current user
// Remove user from local storage using login key reference
export const signOut = () => {
    return async (dispatch) => {
        dispatch(userSignOut());
        localStorage.removeItem(LOGIN_USER_KEY);
        // Dispatch an action that returns/redirects user to the sign-in page
        dispatch(push('/signin'))
    }
};