// THIS FILE WILL BE USE TO HOLD THE INITIAL / DEFAULT STATE OF THE APPLICATION

const initialState = {
    posts: {
        results: [],
        count: 0,
        next: null,
        previous: null
    },
    // Initial state of user
    users: {
        // EMpty string / no user created / active
        username: '',
        // Empty string / no email provided
        email: '',
        // Empty string / no password provided
        password: '',
        // Empty string / no token created
        token: '',
        // Empty string / no token expiration date/time provided
        token_expires_at: '',
    },
    // Initial state of carts
    carts: {
        // Empty list / cart
        list: [],
        // No items / no subtotal / Subtotal zero because no items calculated
        subtotal: 0
    },
    // Initial state of items
    items: {
        // Empty list / no items selected
        list: [],
    },
    // Initial state of an order
    order: {
        // Empty list / No order
        list: [],
        // Subtotal zero because no items calculated
        subtotal: 0
    }
};

export default initialState;
