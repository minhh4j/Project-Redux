import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrdersAsync = createAsyncThunk('orders/fetchOrders', async (id) => {
  const response = await axios.get(`http://localhost:3008/user/${id}`);
  return response.data.order;
});

export const placeOrderAsync = createAsyncThunk(
  'orders/placeOrder',
  async ({ id, newOrder }, { getState }) => {
    const orders = getState().orders.orders;
    const updatedOrders = [...orders, newOrder];
    await axios.patch(`http://localhost:3008/user/${id}`, { order: updatedOrders, cart: [] });
    return updatedOrders;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrdersAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export default ordersSlice.reducer;
