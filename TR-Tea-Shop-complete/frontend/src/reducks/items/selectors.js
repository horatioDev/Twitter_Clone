// Import createSelector from reselect library
// This is used for optimization when the inputs of state is changed; improve performance when combining different state/s in store
import { createSelector } from 'reselect';

// Selector to handle initial state of items
const itemsSelector = state => state.items;

// Get items selector handles the changes to items list: items in/to be added cart
export const getItems = createSelector([itemsSelector], (state) => state.list)
