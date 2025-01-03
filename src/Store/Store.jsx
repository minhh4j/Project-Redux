import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../Slices/ProductSlice"
import CartReducer from "../Slices/CartSlice"
import SearchReducer from "../Slices/SearchSlice"
import OrdersReducer from "../Slices/OrderSlice"
export const Store = configureStore({
    reducer:{
    product:ProductReducer,
    cart:CartReducer,
    orders: OrdersReducer,
    search:SearchReducer,
    }
})


