// THIS FILE IS USED TO SET THE REDUCER FOR THE CARTS

// Import all action/action_creators from carts to prevent namespace pollution
import * as Actions from './actions';

// Import the  initial state from store
import initialState from '../store/initialState';

// A Reducer is a function that takes in the initial state and action and returns a new state depending on what action was take to change the initial state
export const CartsReducer = (state=initialState.carts, action) => {
    // Switch case depending on action taken
    switch(action.type) {
        // Case depends on action: Get cart
        case Actions.FETCH_CART: 
            return {
                list: action.list,
                subtotal: action.subtotal,
            };
        // Case depends on action: Add to cart
        case Actions.CART_ADD: 
            return {
                list: action.list,
                subtotal: action.subtotal,
            };
        // Case depends on action: Increase item in cart
        case Actions.CART_INCREASE: 
            return {
                list: action.list,
                subtotal: action.subtotal,
            };
        // Case depends on action: Decrease item in cart
        case Actions.CART_DECREASE: 
            return {
                list: action.list,
                subtotal: action.subtotal,
            };
        // Set default to return initial state
        default:
            return state;
    }
}
// NOTE: There is no reference to state because cart is new and has no history


