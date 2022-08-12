// THIS FILE IS USED FOR ASYNC / DATA FETCHING

// Import API 
import API from '../../API';

// Import add order from Actions.js
import { addOrder } from '../order/actions';

// Variable instance to hold API func
const api = new API();


// Create an add order func that takes in params as a parameter and if valid returns an async func ...
// Params: is used to reference data / info passed to order form
export const userAddOrder = (params) => {
    // Return async func w/ dispatch as a parameter
    return async (dispatch) => {
        // Console log params to see data / info in console
        console.log('params', params);
        
        // return api dat/info w/ order info
        // return order w/ order params/info passed as an argument
        return api
        .orderAdd(params)
        .then((order) => {
            // Then if order is valid
            // Dispatch w/ add order action as a parameter w/ order as an argument, that informs the store of what changes were made or wants to make to the state of app when addOrder is called
            dispatch(addOrder(order));
        })
        .catch((error) => {
            // Catch if not valid and send an alert
            // alert('Failed to connect to API to: add order')
            // console log error
            console.log(error);
        })
    }
}