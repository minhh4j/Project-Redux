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
  async ({ id, product }, { getState }) => {
    const state = getState();
    let updatedCart = [...state.cart.cart];

    const existingItem = updatedCart.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    await axios.post('http://localhost:3008/products', product);

    await axios.patch(`http://localhost:3008/user/${id}`, { cart: updatedCart });

    return updatedCart;
  }
);




export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCart',
  async ({ id, productId }, { getState }) => {
    const cart = getState().cart.cart.filter((item) => item.id !== productId);
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
      });
  },
});

export const { calculateTotalAmount } = cartSlice.actions;

export default cartSlice.reducer;


// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Fetch cart from the backend
// export const fetchCartAsync = createAsyncThunk(
//   "cart/fetchCart",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`http://localhost:3008/user/${id}`);
//       return response.data.cart;
//     } catch (error) {
//       return rejectWithValue(error.response ? error.response.data : error.message);
//     }
//   }
// );

// // Increment cart quantity
// export const incrementCartAsync = createAsyncThunk(
//   "cart/incrementCart",
//   async ({ id, product }, { getState }) => {
//     const state = getState();
//     let updatedCart = [...state.cart.cart];

//     const existingItem = updatedCart.find((item) => item.id === product.id);
//     if (existingItem) {
//       existingItem.quantity += 1;
//     } else {
//       updatedCart.push({ ...product, quantity: 1 });
//     }

//     await axios.patch(`http://localhost:3008/user/${id}`, { cart: updatedCart });
//     return updatedCart;
//   }
// );

// // Decrement cart quantity
// export const decrementCartAsync = createAsyncThunk(
//   "cart/decrementCart",
//   async ({ id, product }, { getState }) => {
//     const state = getState();
//     let updatedCart = [...state.cart.cart];

//     const existingItem = updatedCart.find((item) => item.id === product.id);
//     if (existingItem) {
//       existingItem.quantity -= 1;
//       if (existingItem.quantity <= 0) {
//         updatedCart = updatedCart.filter((item) => item.id !== product.id);
//       }
//     }

//     await axios.patch(`http://localhost:3008/user/${id}`, { cart: updatedCart });
//     return updatedCart;
//   }
// );

// // Remove an item from the cart
// export const removeFromCartAsync = createAsyncThunk(
//   "cart/removeFromCart",
//   async ({ id, productId }, { getState }) => {
//     const cart = getState().cart.cart.filter((item) => item.id !== productId);
//     await axios.patch(`http://localhost:3008/user/${id}`, { cart });
//     return cart;
//   }
// );

// // Cart slice
// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cart: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     calculateTotalAmount(state) {
//       state.totalAmount = state.cart.reduce(
//         (acc, val) => acc + val.price * val.quantity,
//         0
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCartAsync.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCartAsync.fulfilled, (state, action) => {
//         state.cart = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchCartAsync.rejected, (state, action) => {
//         state.error = action.error.message;
//         state.loading = false;
//       })
//       .addCase(incrementCartAsync.fulfilled, (state, action) => {
//         state.cart = action.payload;
//       })
//       .addCase(decrementCartAsync.fulfilled, (state, action) => {
//         state.cart = action.payload;
//       })
//       .addCase(removeFromCartAsync.fulfilled, (state, action) => {
//         state.cart = action.payload;
//       });
//   },
// });

// export const { calculateTotalAmount } = cartSlice.actions;

// export default cartSlice.reducer;
