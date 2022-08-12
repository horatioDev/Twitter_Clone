// THIS FILE IS USED TO SET THE REDUCER FOR THE USERS

// Import all action/action_creators from users to prevent namespace pollution
import * as Actions from './actions';

// Import the  initial state from store
import initialState from '../store/initialState';

// A Reducer is a function that takes in the initial state and action and returns a new state depending on what action was take to change the initial state
export const UserReducer = (state=initialState.users, action) => {
    // Switch case depending on action taken
    switch(action.type) {
        // Case depends on action: User Sign Up
        case Actions.SIGN_UP: 
            return {
                // Reference state so it doesn't mutate original, but returns a copy of that state w/ changes
                ...state,
                // Reference to changes made to state of app
                ...action.payload,
            };
        // Case depends on action: Add to cart
        case Actions.SIGN_IN: 
            return {
                ...state,
                ...action.payload,
            };
        // Case depends on action: Increase item in cart
        case Actions.SIGN_OUT: 
            return {
                // Returns a copy of original state
                ...state,
            };
        // Set default to return initial state
        default:
            return state;
    }
}
// NOTE: There is no reference to state because cart is new and has no history