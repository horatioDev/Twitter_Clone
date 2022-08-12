// THIS FILE IS USED TO SET THE ITEM IN CART OF THE TEA SHOP: 

// Import React, useEffect from react
//  and useEffect are used to set state and side effects of app
import React, { useEffect } from "react";

// Import useDispatch and useSelector from react redux
import { useDispatch, useSelector } from "react-redux";

// Import increase/decrease cart operations
import { userCartIncrease, userCartDecrease } from "../../reducks/carts/operations";

// Import getCarts and getSubtotal selectors
import { getCarts, getSubtotal } from '../../reducks/carts/selectors'

// Import images to be used
// import smX from '../../assets/img/sm_close.png';


// Create item in cart arrow func to handle each item to be presented pass cart, quantity and cart id as parameter 
const CartItem = ({ cart }) => {
    // Set selector to current state
    const selector = useSelector(state => state);
    // Set dispatch to useDispatch to inform store of changes to be made
    const dispatch = useDispatch();
    // Set carts and subtotal to selector that modifies state accordingly
    const carts = getCarts(selector);
    const subtotal = getSubtotal(selector);

    // Create a arrow func that allows you to increase item in users personal cart by its id
    const increaseCartItem = () => {
        // Dispatch increase action to user's personal cart
        dispatch(userCartIncrease(cart.id));
    };

    // Create a arrow func that allows you to decrease item in users  cart by its id
    const decreaseCartItem = () => {
        // Dispatch increase action to user's  cart
        dispatch(userCartDecrease(cart.id));
    };

    // Create delete function

    // Create an effect that ...
    useEffect(() => {
            // Log carts info/data: Picture of item/s in cart
            console.log(carts.image);
            console.log(cart);
       
    // Return item subtotal as a dependency
    }, []);
    
  return (
            <>
                {/* -- Tea/s -- */}
                <tr>
                    <td>
                      <div class="product_item">
                          <img class="product_img" src={ 'https://res.cloudinary.com/techis/' + cart.item.image } alt="Tea" />
                          <div class="item_description">
                              <h4>{ cart.item.name }</h4>
                              {/* <h5>{ cart.item.id }</h5> */}
                          </div>
                      </div>
                    </td>
                    <td>
                      <div class="increment_button_container">
                          <div class="increment_button" type="">
                              <button id="decrement" type="button"  class="value_button decrement"
                              onClick={ decreaseCartItem }>-</button>
                              <input type="number" name="number" class="number" value={cart.quantity} />
                              <button id="increment" type="button"  class="value_button increment" onClick={ increaseCartItem }>+</button>
                          </div>
                      </div>
                    </td>
                    <td>
                      <div class="item_price">
                          <div class="price">${ cart.item.price }</div>
                      </div>
                    </td>
                </tr>
                
                
            </>
  )
}

export default CartItem;