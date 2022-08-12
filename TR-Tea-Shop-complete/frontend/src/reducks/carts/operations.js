// THIS FILE IS USED FOR ASYNC / DATA FETCHING
// Import API 
import API from '../../API';

// Import cartAdd, cartIncrease, cartDecrease from Actions.js
import { cartAdd, cartIncrease, cartDecrease, fetchCart } from '../carts/actions';

// Variable instance to hold API func
const api = new API();


// Create func that calculates the subtotal of items in user's cart
const calculatedSubtotal = (carts) => {
    // Set subtotal to zero
    let subtotal = 0;
    // Loop through items in cart then increase by quantity
    // key is used to reference the item in cart
    for (let key in carts) {
        // Set subtotal to reference the amount of the items in the  cart
        subtotal += Number(carts[key].item.price * carts[key].quantity)
    }
    // return subtotal
    return subtotal;
};

// Create function that retrieves user cart and returns an async func 
export const fetchUserCart = () => {
    // Return async w/ dispatch as a parameter
    return async (dispatch) => {
        // Return api data/info ...
        // Then if cart/s exist / is valid
        return api
        .getCarts()
        .then((carts) => {
            // Variable to save/hold user's cart calculated subtotal
            const subtotal = calculatedSubtotal(carts);
            // Dispatch action that takes in fetch cart func as parameter w/ carts and subtotal as an argument; that informs the store of what changes were made or wants to make to the state of app when sign-in is called
            dispatch(fetchCart(carts, subtotal));
        })
        // Catch if not valid then send an alert
        .catch((error) => {
            // Alert message
            alert('Failed to connect to API: carts')
        })
    };
};


// Create a add to cart function that adds item to user's cart and returns an async func ...
export const addToCart = (item) => {
    // Return async func w/ dispatch getState as args
    // Dispatch: informs stores of changes to state
    // getState: retrieves initial state
    return async (dispatch, getState) => { 
        return api
        .addCarts(item.id)
        .then((addedToCart) => {
            // Create instance that holds the previous state of the cart
            let prevCarts = getState().carts.list;
            // Create an instance that refers to the item added to the cart
            addedToCart['item'] = item;
            // Add recent item addition to cart
            prevCarts.push(addedToCart);
            // Variable to save/hold user's cart calculated subtotal
            const subtotal = calculatedSubtotal(prevCarts);
            // Dispatch action that takes in add cart action as parameter w/ carts and subtotal as an argument; that informs the store of what changes were made or wants to make to the state of app when cart add action is called
            dispatch(cartAdd(prevCarts, subtotal));
        })
        .catch((error) => {
            // Catch if data is not valid an alert error
            alert('Failed to connect to API to: add cart');
            // Console log error WHY??
            console.log(error);
        })
    }
};


// Create a increase cart function that takes cart id as a parameter and returns an async func if validated and ...

export const userCartIncrease = (cart_id) => {
    // Return async func w/ dispatch and getState as a parameter 
    return async (dispatch, getState) => {
        // Set previous/current state of cart list: items in cart
        let prevCarts = getState().carts.list;
        // Set user cart by filtering cart id that matches users cart
        let userCart = prevCarts.filter((cart) => cart.id === cart_id);
        // Increase count by user's current quantity
        let additionalItem = userCart[0].quantity + 1;

        // Return api data/info for updated api
        return api
            .updateCarts(cart_id, additionalItem)
            .then((updatedCart) => {
                // Then if updated data/info is valid
                // Update previous cart items/info w/ the updated data
                prevCarts = prevCarts.filter((cart) => cart.id !== cart_id);
                // Push/add updated data to cart
                prevCarts.push(updatedCart);
                // Calculate subtotal of previous
                const subtotal = calculatedSubtotal(prevCarts);
                // Dispatch w/ cart increase action action as a parameter that informs the store of changes made or wants to make to increase item in current user's cart and update the subtotal
                dispatch(cartIncrease(prevCarts, subtotal));            
            })
            // If data is not valid cart error and send an alert
            .catch((error) => {
                alert('Failed to connect to API that increases cart quantity.')
                // Console log error
                console.log(error)
            })
    }
};


// Create a decrease cart function that takes in cart id as a parameter and returns an async func if validated and ...

export const userCartDecrease = (cart_id) => {
    // Return async func w/ dispatch and getState as a parameter 
    return async (dispatch, getState) => {
        // Set previous/current state of cart list: items in cart
        let prevCarts = getState().carts.list;
        // Set user cart by filtering cart id that matches users cart
        let userCart = prevCarts.filter((cart) => cart.id === cart_id)
        // Decrease count by user's current quantity
        let additionalItem = userCart[0].quantity - 1;

        // Check if quantity is more than 0
        if (additionalItem > 0) {

            // Return api data/info for updated api
            return api.updateCarts(cart_id, additionalItem)
            .then((updatedCart) => {
                // Then if updated data/info is valid
                // Update previous cart items/info w/ the updated data
                prevCarts = prevCarts.filter((cart) => cart.id !== cart_id);
                // Push/add updated data to cart
                prevCarts.push(updatedCart);
                // Calculate subtotal of previous
                const subtotal = calculatedSubtotal(prevCarts);
                // Dispatch w/ cart decrease action action as a parameter that informs the store of changes made or wants to make to increase item in current user's cart and update the subtotal
                dispatch(cartDecrease(prevCarts, subtotal));            
            })
            .catch((error) => {
                // If data is not valid cart error and send an alert
                alert('Failed to connect to API that decreases cart quantity.')
                // Console log error
                console.log(error);
            })
            // Else if quantity is zero delete
        } else {
            // Delete cart by cart id
            return api 
            .deleteCarts(cart_id)
            .then((deletedCarts) => {
                // Then take in deleted carts as parameter that filters previous cart by id
                prevCarts = prevCarts.filter((cart) => cart.id !== cart_id);
                // Calculate subtotal
                const subtotal = calculatedSubtotal(prevCarts);
                // Dispatch cart decrease action so that store is update w/ current data
                dispatch(cartDecrease(prevCarts, subtotal));
            })
            .catch((error) => {
                // If there is an error, catch and send an alert
                alert('Failed to connect to API that decreases cart quantity.')
                // Log error
                console.log(error);
            })
        }
    }
};