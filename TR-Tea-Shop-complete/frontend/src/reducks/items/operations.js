// THIS FILE IS USED FOR ASYNC / DATA FETCHING

// Import API 
import API from '../../API';

// Import fetch items from Actions.js
import { fetchItem } from '../items/actions';

// Variable instance to hold API func
const api = new API();


// Create function that retrieves user cart item/s and returns an async func 
export const fetchUserItem = () => {
    // Return async w/ dispatch as a parameter
    return async (dispatch) => {
        // Return api data/info ...
        // Reference get items function from API.js
        return api
        .getItems()
        .then((items) => {
            // Then if cart item/s exist / is valid
            // Dispatch action that takes in fetch item func as parameter w/ items as an argument; that informs the store of what changes were made or wants to make to the state of app when sign-in is called
            dispatch(fetchItem(items));
        })
        .catch((error) => {
            // Catch if not valid then send an alert
            // Alert message
            alert('Failed to connect to API that fetches: items')
        })
    };
};