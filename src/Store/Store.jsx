import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from "../Slices/ProductSlice"
import CartReducer from "../Slices/CartSlice"
import SearchReducer from "../Slices/SearchSlice"
export const Store = configureStore({
    reducer:{
    product:ProductReducer,
    cart:CartReducer,
    search:SearchReducer,
    }
})


