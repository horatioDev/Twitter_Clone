// Import createSelector from reselect library
// This is used for optimization when the inputs of state is changed; improve performance when combining different state/s
import { createSelector } from 'reselect';

// Selector to handle initial state of carts
const cartsSelector = state => state.carts;

// Get carts selector handles the changes to cart list: items in cart
export const getCarts = createSelector([cartsSelector], (state) => state.list)

// Get sub total selector handles the changes to carts' subtotal: cost of items in cart
export const getSubtotal = createSelector([cartsSelector], (state) => state.subtotal)


// DOES SELECTORS REPLACE OR MODIFY mapStateToProps???