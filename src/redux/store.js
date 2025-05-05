import { configureStore } from "@reduxjs/toolkit";
import shoppingSlice from "./shoppingSlice";

const store = configureStore({
  reducer: {
    shopping: shoppingSlice,
  },
});

export default store;
