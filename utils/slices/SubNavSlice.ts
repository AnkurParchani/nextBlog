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

// Exporting dispatch functions
export const { setTitle } = subNavSlice.actions;

// Exporting the reducer
export default subNavSlice.reducer;

// Selectors
export const getTitle = (state: RootState) => state.subNav.title;
