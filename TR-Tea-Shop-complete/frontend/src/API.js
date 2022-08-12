import axios from 'axios';
const LOGIN_USER_KEY = 'LOGIN_USER_KEY';


// UPDATE BASE URL UPON COMPLETION FOR DEPLOYMENT TO HEROKU
var baseURL;
if (process.env.REACT_APP_ENVIRONMENT && process.env.REACT_APP_ENVIRONMENT === 'PRODUCTION') {
    baseURL = process.env.REACT_APP_API_BASE_URL;
} else {
    baseURL = 'http://127.0.0.1:8000';
}

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * Add requireToken: true in request config, for API that required Authorization token
 */
api.interceptors.request.use(
    config => {
        if (config?.requireToken && localStorage.getItem(LOGIN_USER_KEY)) {
            config.headers.common['Authorization'] = JSON.parse(localStorage.getItem(LOGIN_USER_KEY)).token;
        }

        return config;
    },
    err => {
        console.error(err);
    }
);


export default class API {
    ///////////////////////////////////////////
        // Reference Post
    //////////////////////////////////////////
    getPosts = params => {
        return api
            .get('/posts/', { params })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
    };
    addPost = postBody => {
        const formData = new FormData();

        for (const key in postBody) {
            formData.append(key, postBody[key]);
        }

        return api
            .post('/posts/add/', formData)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
    };
    deletePost = id => {
        return api.delete(`/posts/delete/${id}/`).catch(error => {
            throw new Error(error);
        });
    };


    ///////////////////////////////////////////
    // USERS:
    // Define three async functions that handles api request for user/s
    //////////////////////////////////////////
    // Sign Up async func that takes username, email and password as parameters, that returns registered user object if api request is satisfied
    // Create variable that holds returned object data
    // Create post request that creates an api object that saves args used in object parameter passed to post request
    // Then returns object w/ response data
    signUp = async (username, email, password) => {
    const newUser = await api
        .post('users/signup/', {
            username: username,
            email: email,
            password: password
        })
        .then(response => {
            return response.data;
        })
        // If there's an error catch / throw error message
        .catch(error => {
            throw new Error(error);
        })
    // returns object data: new/registered user
    return newUser
    };

    // Sign In async func that takes email and password as parameters, that returns logged in user object if api request is satisfied
    // Create variable that holds returned object data
    // Then if valid return object data
    // If there's an error catch / throw error message
    signIn = async (email, password) => {
    const loggedUser = await api
        .post('users/signin/', {
            email: email,
            password: password
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw new Error(error);
        })
    // returns object data: logged in user
    return loggedUser
    };

    // Get users async func that returns user if api request is satisfied
    getUsers = async () => {
    // Create variable that holds returned object data
    // Create get request that fetches an api object that matches args used in parameter passed to get request
    // Then returns object w/ response data
    const users = await api 
        .post('/users/')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            // If there's an error catch / throw error message
            throw new Error(error);
        })
        // returns object data
        return users;
    };


    ///////////////////////////////////////////
    // CARTS:
    // Define four async functions that handles api request for cart/s
    //////////////////////////////////////////
    // Get cart/s async func that retrieves user cart data
    getCarts = async () => {
        // Variable that holds data retrieve from api 

        // let key =  JSON.parse(localStorage.getItem(LOGIN_USER_KEY)).token
        // console.log('key', key);
        const carts = await api
            .get('/carts/', {requireToken: true})
            .then(response => {
                 return response.data;
            })
            .catch(error => {
                throw new Error(error);
            })
        // return cart data 
        return carts
    };

    // Add carts async func that post data in api based on item id parameter passed to add cart

    // Saves items in cart
    addCarts = async (item_id) => {
        const userCartItem = await api
            .post('/carts/add/', {
                item: item_id,
                quantity: 1
            }, {requireToken: true})
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            });
        return userCartItem;
    };

    // Update cart async func that allows user to update their cart, based on cart id and quantity parameters passed to func

    // Updates user carts quantity
    updateCarts = async (cart_id, quantity) => {
        const userCartUpdate =await api
            .put('/carts/update/' + cart_id + '/', {
                quantity: quantity
            },{requireToken: true})
            .then(response => {
                return response.data
            })
            .catch(error => {
                throw new Error(error)
            })
        // return updated cart
        return userCartUpdate
    };

    // Delete cart async func that deletes user cart by cart id
    // Then if valid return object data
    // If not valid catch and throw error
    // return deleted cart
    deleteCarts = async (cart_id) => {
        const userCartDelete = await api
            .delete('/carts/delete/' + cart_id + '/', {requireToken: true})
            .then(response => {
                return response.data
            })
            .catch(error => {
                throw new Error(error)
            })
        return userCartDelete;
    };


    ///////////////////////////////////////////
    // ITEMS:
    // Define an async functions that handles api request for item/s
    //////////////////////////////////////////
    // Get items async func that returns items path-based url if api request is satisfied
    // Create a variable that holds api response data
    // return items based on url
    getItems = async () => {
        let url = '/items/';
        const items = await api
            .get(url)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw new Error(error);
            })  
        return items;
    };

    ///////////////////////////////////////////
    // ORDER:
    // Define an async functions that handles api request for order/s
    //////////////////////////////////////////
    // Order add func that takes in an empty object as parameter; params is equal to an empty object because there is no info created yet since order form will be empty until an order has been created
    // Variable that holds api requested data
    // Post request that creates an ... object based on info provided to params/object fields on order form
    // Then returns object w/ data based on response
    // If there's an error catch / throw error message
    orderAdd = async (params = {}) => {
        const order = await api
            .post('orders/add/', params, {requireToken: true})
            .then(response => {
                return response.data
            })
            .catch(error => {
                throw new Error(error)
            })
        // Returns order based on info passed in
        return order;
    };
}
