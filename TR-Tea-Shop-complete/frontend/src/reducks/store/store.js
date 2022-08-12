// THIS FILE IS USED TO HOLD APPLICATION STATE

// THIS FILE IS ALSO USED TO ALLOW ACTIONS AND REDUCERS TO INTERACT w/ EACH OTHER
import { createStore as reduxCreateStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';

import { PostsReducer } from '../posts/reducers';

// Import Reducers for use in store
import { UserReducer } from '../users/reducers';
import { ItemsReducer } from '../items/reducers';
import { CartsReducer } from '../carts/reducers';
import { OrderReducer } from '../order/reducers';

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            posts: PostsReducer,
            // Give the store access to the other reducers
            users: UserReducer,
            items: ItemsReducer,
            carts: CartsReducer,
            order: OrderReducer
        }),
        compose(
            applyMiddleware(routerMiddleware(history), thunk)
            // DEBUG MODE
            // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
}
