import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "", // The search query will be stored here
  },
  reducers: {
    setSearch(state, action) {
      state.query = action.payload; // Update the search query in Redux state
    },
  },
});

export const { setSearch } = searchSlice.actions;
export default searchSlice.reducer;
