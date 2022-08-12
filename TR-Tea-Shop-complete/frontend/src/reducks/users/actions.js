// THIS FILE CONTAINS THE 'USER' ACTIONS / ACTION CREATORS USED TO INTERACT w/ STORE


// ACTIONS: Best practices - define by using 'STRING_CONST'

// TYPE OF ACTION: USER SIGN UP
export const SIGN_UP = 'SIGN_UP'

// DEFINE ACTION CREATOR: A func that returns an action w/ an object w/ a type property = action const


// This action allow current user to sign up for access, by passing user as args to a function that returns an object containing the action
export const userSignUp = (user) => {
    // Return the Action
    return {
        type: 'SIGN_UP',
        // Set payload property to return the current user
        payload: user,
    }
}


// TYPE OF ACTION: USER SIGN IN
export const SIGN_IN = 'SIGN_IN'

// This action gives access to current active user to sign in for access, by passing user as args to a function that returns an object containing the action
export const userSignIn = (user) => {
    return {
        type: 'SIGN_IN',
        payload: user
    }
}


// TYPE OF ACTION: USER SIGN OUT
// Increase item in cart
export const SIGN_OUT = 'SIGN_OUT'

// This action gives current active user ability to sign out, by accessing a function that returns an object containing the action

// Export for use in components
export const userSignOut = () => {
    return {
        type: 'SIGN_OUT',
        // Set payload to return an empty object since no user will be logged in / active
        payload: {}
    }
}
