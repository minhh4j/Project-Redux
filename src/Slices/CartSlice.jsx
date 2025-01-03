import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk(
  'cart/fetchCart',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3008/user/${id}`);
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


export const addProductToDBAndCartAsync = createAsyncThunk(
  'cart/addProductToDBAndCart',
  async ({ id , product }, { getState }) => {
    console.log(id, 'hello');
    
    const state = getState();
    // console.log(state,"privious cart");
    
    let updatedCart = [...state.cart.cart];

    const existingItem = updatedCart.find((item) => item.id === product.id);
    console.log(existingItem,"exist minhaj")
    if (existingItem) {
      updatedCart = updatedCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    const response = await axios.patch(`http://localhost:3008/user/${id}`, { cart: updatedCart });
      return response.data.cart;
  }

);

export const decrementProductInDBAndCartAsync = createAsyncThunk(
  'cart/decrementProductInDBAndCart',
  async ({ id, productId }, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      let updatedCart = [...state.cart.cart];
      const existingItem = updatedCart.find((item) => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          updatedCart = updatedCart.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
          );
        } else {
          updatedCart = updatedCart.filter((item) => item.id !== productId);
        }
      }
      const response = await axios.patch(`http://localhost:3008/user/${id}`, { cart: updatedCart });
      if (!response.data || !response.data.cart) {
        throw new Error('Invalid API response: Cart data missing.');
      }
      return response.data.cart;
    } catch (error) {

      return rejectWithValue(error.response?.data || 'An error occurred while updating the cart.');
    }
  }
);





export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCart',
  async ({ id, productId }, { getState }) => {
    const cart = getState().cart.cart.filter((item) => item.id !== productId);
    console.log(cart,"cart");
    
    await axios.patch(`http://localhost:3008/user/${id}`, { cart });
    return cart;
  }
);


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    calculateTotalAmount(state) {
      state.totalAmount = state.cart.reduce(
        (acc, val) => acc + val.price * val.quantity,
        0
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchCartAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addProductToDBAndCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
      })
      .addCase(decrementProductInDBAndCartAsync.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(decrementProductInDBAndCartAsync.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { calculateTotalAmount } = cartSlice.actions;

export default cartSlice.reducer;
