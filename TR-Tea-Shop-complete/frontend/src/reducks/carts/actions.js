// THIS FILE CONTAINS THE 'CARTS' ACTIONS / ACTION CREATORS USED TO INTERACT w/ STORE

// ACTIONS: Best practices - define by using 'STRING_CONST'

// TYPE OF ACTION: GET CART
export const FETCH_CART = 'FETCH_CART'

// DEFINE ACTION CREATOR: A func that returns an action w/ an object w/ a type property = action const


// This action gets the cart with the current cart items / the subtotal by passing cart and subtotal as args to a function that returns an object containing the action

// Export for use in components
export const fetchCart = (carts, subtotal) => {
    // Return the Action
    return {
        type: 'FETCH_CART',
        // Set list property to return a list of objects of what is in cart
        list: carts,
        // Set subtotal property to the amount of item available in cart
        subtotal: subtotal,
    }
}


// TYPE OF ACTION: ADD CART
export const CART_ADD = 'CART_ADD'

// This action gives access to current cart items and subtotal by passing cart and subtotal as args to a function that returns an object containing the action

// Export for use in components
export const cartAdd = (carts, subtotal) => {
    return {
        type: 'CART_ADD',
        list: carts,
        subtotal: subtotal,
    }
}


// TYPE OF ACTION: UPDATE CART
// Increase item in cart
export const CART_INCREASE = 'CART_INCREASE'

// This action increases the current cart items and subtotal, by passing cart and subtotal as args to a function that returns an object containing the action

// Export for use in components
export const cartIncrease = (carts, subtotal) => {
    return {
        type: 'CART_INCREASE',
        list: carts,
        subtotal: subtotal,
    }
}


// Decrease item in cart
export const CART_DECREASE = 'CART_DECREASE';

// This action decreases the current cart items and subtotal, by passing cart and subtotal as args to a function that returns an object containing the action

// Export for use in components
export const cartDecrease = (carts, subtotal) => {
    return {
        type: 'CART_DECREASE',
        list: carts,
        subtotal: subtotal,
    }
}