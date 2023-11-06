import { configureStore } from "@reduxjs/toolkit";
import subNavReducer from "../../../lib/SubNavSlice";

export const store = configureStore({
  reducer: {
    subNav: subNavReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
