import { createSlice } from "@reduxjs/toolkit";

// The Initial state
const initialState = {};

// Dispatch functions
const uiSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {},
});

// Exporting dispatch functions
export const {} = uiSlice.actions;

// Exporting the reducer
export default uiSlice.reducer;

// Selectors
