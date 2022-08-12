// THIS FILE IS USED TO SET THE REDUCER FOR THE CARTS

// Import all action/action_creators from carts to prevent namespace pollution
import * as Actions from './actions';

// Import the  initial state from store
import initialState from '../store/initialState';

// A Reducer is a function that takes in the initial state and action and returns a new state depending on what action was take to change the initial state
export const ItemsReducer = (state=initialState.items, action) => {
    // Switch case depending on action taken
    switch(action.type) {
        // Case depends on action: Get item/s
        case Actions.FETCH_ITEM: 
            return {
                // Referencing state since we are updating the previous state
                ...state,
                list: action.payload,
            };
        // Return the default state
        default:
            return state;
    }
}
// NOTE: There is a reference to state because a change to the initial state