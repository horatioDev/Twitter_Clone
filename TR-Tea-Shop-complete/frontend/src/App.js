import React from 'react';
// Import Router to handle page directing
import Router from './Router';

// Import style.css for design
import './assets/style.css';

// Import Header to be displayed in app
// import Header from './components/Common/Header';

// TESTING - TO BE REMOVED
// import CartHeader from './components/Common/CartHeader';
// import SignUp from './containers/SignUp';
// import SignIn from './containers/SignIn';
// import Home from './containers/Home';
// import ThankYou from './containers/ThankYou';
// import Item from './components/Common/Item';
// import CartItem from './components/Common/CartItem';
// import Order from './containers/Order';
// import ShoppingCart from './containers/ShoppingCart';


function App() {
    return (
        <>
          {/* <Header />  */}
          {/* JUST ADDING TO TEST DISPLAY WILL ORGANIZE CORRECTLY WHEN JSX IS COMPLETED */}
          {/* <CartHeader /> */}
          {/* <Item /> */}
          {/* <CartItem /> */}
          {/* <SignUp /> */}
          {/* <SignIn /> */}
          {/* <Home />  */}
          {/* <ThankYou /> */}
          {/* <Order /> */}
          {/* <ShoppingCart /> */}
          {/* Router is used to direct/navigate app pages via Routers.jsx */}
          <Router />
        </>
    );
}

export default App;
