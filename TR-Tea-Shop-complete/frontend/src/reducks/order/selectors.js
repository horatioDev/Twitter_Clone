// Import createSelector from reselect library
// This is used for optimization when the inputs of state is changed; improve performance when combining different state/s in store
import { createSelector } from 'reselect';

// Selector to handle initial state of order
const orderSelector = state => state.order;

// Get order selector handles the changes to order list: items in order
export const getOrder = createSelector([orderSelector], (state) => state.list)


// WHY WAS THIS NOT IMPLEMENTED ???

// Get sub total selector handles the changes to order' subtotal: cost of items in order
// export const getSubtotal = createSelector([orderSelector], (state) => state.subtotal)