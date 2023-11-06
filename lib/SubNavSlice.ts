import { RootState } from "@/app/store/store";
import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  title: "Loading",
};

// Main slice dispatch function
const subNavSlice = createSlice({
  name: "subNav",
  initialState,
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
  },
});

// Main slice selector function
export const { setTitle } = subNavSlice.actions;

// Exporting the reducer
export default subNavSlice.reducer;

// Getters
export const getTitle = (state: RootState) => state.subNav.title;
