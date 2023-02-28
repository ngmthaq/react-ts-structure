import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./reducers/common.reducer";

// Configure store for redux
const store = configureStore({
  reducer: {
    common: commonReducer,
  },
});

export default store;
