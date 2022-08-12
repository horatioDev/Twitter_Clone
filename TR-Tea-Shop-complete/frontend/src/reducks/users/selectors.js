// Import createSelector from reselect library
// This is used for optimization when the inputs of state is changed; improve performance when combining different state/s
import { createSelector } from 'reselect';

// Selector to handle initial state of user
const userSelector = state => state.user;

// Get user selector handles the changes to user state:
export const getUser = createSelector([userSelector], (state) => state)

// WHY WERE THE OTHER PROPERTIES NOT INCLUDED ??
// - STATE OF USER IS NOT CONSTANTLY CHANGING ?
// - ONCE USER IS CREATED DOES THE STATE BECOME STATIC ?