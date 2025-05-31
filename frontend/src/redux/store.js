import { configureStore } from '@reduxjs/toolkit';
import authReducer from  './reducers/authReducer.js';
import {navReducer} from './reducers/navReducer.js';
import { filterReducer} from './reducers/filterSideBarReducer.js';
import { prodReducer } from './reducers/productReducer.js';
import {cartReducer} from './reducers/cartReducer.js';
import { orderReducer } from './reducers/ordersReducer.js';



export const store = configureStore({
    // reducer: (state = {}) => state  Placeholder reducer
    reducer: {
        auth: authReducer, // <-- this connects your auth slice to Redux
        nav: navReducer,
        filter: filterReducer,
        prod: prodReducer,
        cart: cartReducer,
        order: orderReducer
      }

});