// THIS FILE IS USED TO DIRECT PATH TO PAGE USING ROUTER / SWITCH
import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './containers/Home';

// Import SignUp from containers
import SignUp from './containers/SignUp'

// Import SignIn from containers
import SignIn from './containers/SignIn'

// Import ShoppingCart from containers
import ShoppingCart from './containers/ShoppingCart'

// Import Order from containers
import Order from './containers/Order'

// Import ThankYou from containers
import ThankYou from './containers/ThankYou'

const Router = () => {
    return (
        <>
            <Switch>
                <Route exact path={'/'} component={Home} />
                {/* Create paths to pages in containers dir */}
                <Route exact path={'/signup'} component={SignUp} />
                <Route exact path={'/signin'} component={SignIn} />
                <Route exact path={'/cart'} component={ShoppingCart} />
                <Route exact path={'/order'} component={Order} />
                <Route exact path={'/thankyou'} component={ThankYou} />
            </Switch>
        </>
    );
};
export default Router;
