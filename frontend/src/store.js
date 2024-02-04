import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {productsReducer,productDetailsReducer,newReviewReducer,newProductReducer,productReducer,productReviewsReducer,reviewReducer} from './reducers/productReducers'
import { authReducer ,userReducer,forgotPasswordReducer,allUsersReducer,userDetailsReducer} from './reducers/userReducers'
import { cartReducer } from './reducers/cartReducers'
import {newOrderReducer,myOrdersReducer,orderDetailsReducer,allOrdersReducer,orderReducer} from './reducers/orderReducers'

const reducer = combineReducers({
  products:productsReducer  ,
  productDetails: productDetailsReducer,
  newProduct:newProductReducer,
  auth:authReducer,
  user:userReducer,
  forgotPassword:forgotPasswordReducer, 
  cart:cartReducer,
  newOrder:newOrderReducer,
  myOrders:myOrdersReducer,
  orderDetails:orderDetailsReducer,
  newReview:newReviewReducer,
  product:productReducer,
  allOrders:allOrdersReducer,
  order:orderReducer,
  allUsers:allUsersReducer,
  userDetails:userDetailsReducer,
  productReviews:productReviewsReducer,
  review:reviewReducer
})
let initialState = {
  cart:{
    cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
    shippingInfo: localStorage.getItem('shippingInfo')
        ? JSON.parse(localStorage.getItem('shippingInfo'))
        : {}
  }
}

const middlware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlware)))

export default store;  