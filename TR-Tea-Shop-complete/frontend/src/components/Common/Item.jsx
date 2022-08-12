// THIS FILE IS USED TO SET THE ITEM OF THE TEA SHOP: 

// Import React, useEffect and useState from react
// useState and useEffect are used to set state and side effects of app
import React, { useEffect, useState } from "react";

// Import useDispatch and useSelector from react redux
import { useDispatch, useSelector } from "react-redux";

// Import add/increase/decrease cart operations
import { addToCart, userCartIncrease, userCartDecrease } from "../../reducks/carts/operations";

// Import getCarts and getSubtotal selectors
import { getCarts, getSubtotal } from '../../reducks/carts/selectors'

// Import push from connected react router
// Push allows redirection to page passed as argument after it is called
import { push } from "connected-react-router";


// Create item arrow func to handle each item to be presented pass item as parameter

const Item = ({ item }) => {
    // // Set selector to current state
    // const selector = useSelector(state => state);
    // // Set dispatch to useDispatch to inform store of changes to be made
    // const dispatch = useDispatch();
    // // Set carts and subtotal to selector that modifies state accordingly
    // const carts = getCarts(selector);
    // const subtotal = getSubtotal(selector);
    // // Deconstruct cart so it can redefine state accordingly
    // const [personalCart, setPersonalCart] = useState(null);
    // // Create key constance to hold current user's login key credentials
    // const key = localStorage.getItem("LOGIN_USER_KEY");
    const selector = useSelector(state => state);
    const dispatch = useDispatch();
    const carts = getCarts(selector);
    const subtotal = getSubtotal(selector);
    const [particularCart, setParticularCart] = useState(null);
    const key = localStorage.getItem('LOGIN_USER_KEY');

    // Create an effect that checks if cart is not empty, filters by id and assigns / sets cart if item belongs to user's cart
    // useEffect(() => {
    //     // Check if cart is valid and not empty
    //     if (carts !== undefined && carts.length > 0) {
    //         // Log carts info/data
    //         console.log('carts');
    //         console.log(carts);
    //         // Match item to cart by filtering cart and item by id
    //         let userCarts = carts.filter(cart => cart.item.id === item.id);
    //         // Log user cart data
    //         console.log('userCarts');
    //         console.log(userCarts);
    //         // Check if user cart is not empty, if not set to current user else set to empty
    //         if (userCarts.length > 0) {
    //             setPersonalCart(userCarts[0]);
    
    //         } else {
    //             // Set to empty
    //             setPersonalCart(null);
    //         }
    //     }
    // // Return item subtotal as a dependency
    // }, [subtotal]);

    useEffect(() => {
        if (carts != undefined && carts.length > 0) {
            let matchedCarts = carts.filter(cart => cart.item.id == item.id);
            if (matchedCarts.length > 0) {
                setParticularCart(matchedCarts[0]);
            } else {
                setParticularCart(null);
            }
        }
    }, [subtotal]);

    // // Create a arrow func that allows you to add item to cart
    // const addCartItem = () => {
    //     // Check if user key is present
    //     if (key) {
    //         // Dispatch add cart action that add item as as a parameter to cart
    //         dispatch(addToCart(item));
    //         // dispatch(push('/shopping'));
    //     } else {
    //         // If key is not present dispatch redirect to sign in page for validation
    //         dispatch(push('/signin'))
    //     }
    // };

    // // Create a arrow func that allows you to increase item in users personal cart by its id
    // const increaseCartItem = () => {
    //     // Dispatch increase action to user's personal cart
    //     dispatch(userCartIncrease(personalCart.id));
    // };
    const clickAddCart = () => {
        if (key) {
            dispatch(addToCart(item));
        } else {
            dispatch(push('/signin'));
        }
    };
    const clickPlusCart = () => {
        dispatch(userCartIncrease(particularCart.id));
    };
    const clickMinusCart = () => {
        dispatch(userCartDecrease(particularCart.id));
    };



  return (
    <>
    {/* HOW TO CREATE TEMPLATE SYNTAX FOR ITEMS */}
        <div className="tea_shop_container">
            <section class="teas">
                <div class="item">
                    <div class="tea_img">
                        <img src={ 'https://res.cloudinary.com/techis/' + item.image } alt="Cup of tea" /> 
                    </div>
                    <div class="tea_content">
                        <h2>{ item.name }</h2>
                        <div class="quantity">
                            <div class="item_cost">${ item.price }</div> 
                            {particularCart && particularCart.quantity > 0 ? (
                    <div class="added-cart">
                        <div className="added-cart-container">
                            <span id="minus" onClick={clickMinusCart}>
                                －
                            </span>
                            <span id="count">{particularCart.quantity}</span>
                            <span id="plus" onClick={clickPlusCart}>
                                +
                            </span>
                        </div>
                    </div>
                ) : (
                    <button className="add_button" onClick={clickAddCart}>
                        ADD TO CART
                    </button>
                )}
                        </div>
                    </div>
                </div>
            </section>
        </div>


    </>
  )
}

export default Item;