// THIS FILE IS USED TO SET THE REDUCER FOR THE ORDER

// Import all action/action_creators from order to prevent namespace pollution
import * as Actions from './actions';

// Import the  initial state from store
import initialState from '../store/initialState';

// A Reducer is a function that takes in the initial state and action and returns a new state depending on what action was take to change the initial state

// Gives the cartsReducer  access to the order by passing the orders' initial state to keep track of an order
export const OrderReducer = (state=initialState.order, action) => {
    // Switch case depending on action taken
    switch(action.type) {
        // Case depends on current action: Add an order, based on items in the cart reason for use of CartsReducer
        case Actions.ADD_ORDER: 
            return {
                list: action.list,
                subtotal: action.subtotal,
            };
        // Return default state
        default:
            return state;
    }
}
// NOTE: There is no reference to state because order is new and has no history