import { RootState } from "@/app/store/store";
import { createSlice } from "@reduxjs/toolkit";

// The Initial state
const initialState = {
  theme: "dark",
  bottomNavLink: "/",
};

// Dispatch functions
const uiSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
    },
    setBottomNavLink(state, action) {
      state.bottomNavLink = action.payload;
    },
  },
});

// Exporting dispatch functions
export const { setTheme, setBottomNavLink } = uiSlice.actions;

// Exporting the reducer
export default uiSlice.reducer;

// Selectors
export const getTheme = (state: RootState) => state.interface.theme;
export const getBottomNavLink = (state: RootState) =>
  state.interface.bottomNavLink;
