// THIS FILE CONTAINS THE 'ITEMS' ACTIONS / ACTION CREATORS USED TO INTERACT w/ STORE

// ACTIONS: Best practices - define by using 'STRING_CONST'

// TYPE OF ACTION: GET ITEMS
export const FETCH_ITEM = 'FETCH_ITEM'

// DEFINE ACTION CREATOR: A func that returns an action w/ an object w/ a type property = action const


// This action gets the items in current users cart, by passing items as args to a function that returns an object containing the action

// Export for use in components
export const fetchItem = (items) => {
    // Return the Action
    return {
        type: 'FETCH_ITEM',
        // Set payload property to return items 
        payload: items
    }
}