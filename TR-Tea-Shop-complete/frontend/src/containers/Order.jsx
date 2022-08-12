import React, { useEffect, useState } from 'react';

// Import useDispatch and useSelector
import { useSelector, useDispatch } from 'react-redux';

// Import API file
import API from '../API';

// Import getCarts and getSubtotal selectors
import { getCarts, getSubtotal,  } from '../reducks/carts/selectors';

// Import fetchUserCart from operations
import { fetchUserCart } from '../reducks/carts/operations';

// Import addOrder from operations
import { userAddOrder } from '../reducks/order/operations';

// Import getUser selector
import { getUser } from '../reducks/users/selectors';

// Import push to allow redirect
import { push } from 'connected-react-router';

// Import Header from common
import Header from '../components/Common/Header';

// Set const api to API method
const api = new API();

// Create a order func that collects current user info for processing order
const Order = () => {
    // Const that request state change and const that allows/sends the action 
    const selector = useSelector(state => state);
    const dispatch = useDispatch();

    // Set const for carts and subtotal
    const subtotal = getSubtotal(selector);
    const carts = getCarts(selector);

    // TEST
    const user = getUser(selector);

    // Set const for user's order info which initial state is empty until information is passed and 'stored'
    const [full_name, setFullName] = useState(''),
      [phone, setPhone] = useState(''),
      [address, setAddress] = useState(''),
      [pin_code, setPinCode] = useState(''),
      [apt, setApt] = useState(''),
      [city, setCity] = useState(''),
      [state, setState] = useState(''),
      [totalQuantity, setTotalQuantity] = useState('');

    // useEffect that gets cart belonging to current user
    useEffect(() => {
        dispatch(fetchUserCart())
     },[])

    // Create a side effect that takes in everything in user's cart calculate and returns the sum
    useEffect(() => {
        // Set an empty list
        let arr = [];
        // Check cart exists and not empty
        if (carts !== undefined && carts.length> 0) {
            // loop through cart items
            for (let key in carts) {
                // Update list w/ quantity of each item
                arr.push(carts[key].quantity);
            }
            // Sum func w/ a reduce callback func that adds up item's in cart and return a sum for that item
            let sum = arr.reduce(function (a, b) {
                return a + b;
            }, 0);
            // Set total quantity of cart to the sum of items
            setTotalQuantity(sum);
        }
    // Return cart/s as a dependency
    }, [carts]);

    
 
    // Constants that return user's input and sets that state to the value passed
    
    // Set Full Name
    const inputFullName = e => {
        setFullName(e.target.value);
    };
    // Set Phone 3
    const inputPhone = e => {
        setPhone(parseInt(e.target.value));
    };
    // Set Address
    const inputAddress = e => {
        setAddress(e.target.value);
    };
    // Set PIN #
    const inputPin = e => {
        setPinCode(parseInt(e.target.value));
    };
    // Set Apt #
    const inputApt = e => {
        setApt(e.target.value);
    };
    // Set City
    const inputCity = e => {
        setCity(e.target.value);
    };
    // Set State
    const inputState = e => {
        setState(e.target.value);
    };

    // Create an order button that collects user's info and send an action to the to update data then redirects to thank you page
    const orderButton = e => {
        // Set params to an object of user's data
        let params = {
            // Total price
            total_price: subtotal, 
            // Full Name
            full_name: full_name,
            // Phone#
            telephone: phone,
            // Address
            address_line1: address,
            // Apt #
            address_line2: apt,
            // City
            city: city,
            // State
            state: state,
            // Postal Code WHY IS POSTAL CODE EQ TO PInCODE ???
            postal_code: pin_code,
            // Set country
            country: "US",
            // Set user
            user: user,
        };
        // Send a dispatch that inform the store of what changes are to be made; prevent the buttons default action and redirect to thank you page
        dispatch(userAddOrder(params));
        e.preventDefault();
        dispatch(push('/thankyou'));
    }
  return (
    <>
        <div class="order_items_container">
            <Header />
            {/* <Header /> */}
            <section class="showcase"></section>
            <section class="shipment_details">
                <div class="receipt">
                    <h3 class="title">Shipment Details</h3>
                    <p>Please check your items and confirm it</p>
                    <div class="ordered_items">
                            {/* Map through cart and return item */}
                            {carts &&
                                carts.map(cart => (
                                    <div class="item">
                                        <div class="description">
                                            <p>{cart.item.name}</p>
                                        </div>
                                        <div class="quantity">{cart.quantity}</div>
                                        <div class="price">${cart.item.price}</div>
                                    </div>
                                ))}
                    </div>
                    <div class="divider"></div>
                    <div class="total_cost">
                        <div class="total_price_text">Total Price</div>
                        <div class="quantity">{totalQuantity}</div>
                        <div class="total_price">${subtotal.toFixed(2)}</div>
                    </div>

                    {/* -- ORDER FORM -- */}
                    <div class="order_form_container">
                        <form method="post" action="" id="order_form">
                            
                            {/* -- Name Field -- */}
                            <label for="full_name">Full Name</label>
                            <br />
                            <input 
                                type="text"               name="full_name" 
                                id="full_name" 
                                placeholder="Enter Recipient's Name" 
                                onChange={inputFullName}
                                required
                                />
                            <br />
                            <br />
                            
                            {/* -- Phone Field -- */}
                            <label for="phone">Phone Number</label>
                            <br />
                            <input 
                                type="text"   name="phone" 
                                id="phone" 
                                placeholder="Enter Phone Number" 
                                onChange={inputPhone}
                                required
                                />
                            <br />
                            <br />
                            
                            {/* -- Address Field -- */}
                            <label for="address">Street address or P.O. Box</label>
                            <br />
                            <input 
                                type="text"
                                name="address" 
                                id="address" 
                                placeholder="Enter Street address or P.O. Box" 
                                onChange={inputAddress}
                                required
                                />
                            <br />
                            <br />
                            
                            {/* -- PIN Field -- */}
                            <label for="pin_code">PIN Code</label>
                            <br />
                            <input 
                                type="text"     name="pin_code" 
                                id="pin_code" 
                                placeholder="Enter PIN code" 
                                onChange={inputPin}
                                required
                                />
                            <br />
                            <br />
                            
                            {/* -- Apt # Field -- */}
                            <label for="apt">Apt, suite, unit, building, floor, etc.</label>
                            <br />
                            <input 
                                type="text"
                                name="apt" 
                                id="apt" 
                                placeholder="Enter Apt, suite, unit, building, etc." 
                                onChange={inputApt}
                                required
                                />
                            <br />
                            <br />
                            
                            {/* -- City Field-- */}
                            <label for="city">City</label>
                            <br />
                            <input 
                                type="text"
                                name="city" 
                                id="city" 
                                placeholder="Enter City" 
                                onChange={inputCity}
                                required
                                />
                            <br />
                            <br />
                            
                            {/* -- State Field -- */}
                            <label for="state">State</label>
                            <br />
                            <input 
                                type="text"
                                name="state" 
                                id="state" 
                                placeholder="Enter State" 
                                onChange={inputState}
                                required
                                />
                            <br />
                            <br />

                            {/* -- Submit Button -- */}
                            <div class="submit_order">
                                <button type="submit" onClick={orderButton}>submit</button>
                            </div>
                        </form>
                    </div>
                </div>     
            </section>
        </div>
    </>
  )
}

export default Order