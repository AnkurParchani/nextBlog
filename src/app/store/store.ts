import { configureStore } from "@reduxjs/toolkit";
import subNavReducer from "../../../utils/slices/SubNavSlice";
import uiSliceReducer from "../../../utils/slices/UiSlice";

export const store = configureStore({
  reducer: {
    subNav: subNavReducer,
    interface: uiSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
