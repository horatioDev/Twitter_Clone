// THIS FILE CONTAINS THE 'ORDER' ACTIONS / ACTION CREATORS USED TO INTERACT w/ STORE

// ACTIONS: Best practices - define by using 'STRING_CONST'

// TYPE OF ACTION: ADD / PLACE ORDER
export const ADD_ORDER = 'ADD_ORDER'

// DEFINE ACTION CREATOR: A func that returns an action w/ an object w/ a type property = action const


// This action allows current users to place / add an order, by passing order as args to a function that returns an object containing the action

// Export for use in components
export const addOrder = (order) => {
    // Return the Action
    return {
        type: 'ADD_ORDER',
        // Set list property to return order, a list of objects
        list: order,
    };
}