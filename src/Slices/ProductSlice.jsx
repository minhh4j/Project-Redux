import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3008/products')
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const ProductsSlice = createSlice({
  name: 'product',
  initialState: {
    product: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true; 
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload; 
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.error = action.payload;  
        state.loading = false;
      });
  },
});

export default ProductsSlice.reducer;
