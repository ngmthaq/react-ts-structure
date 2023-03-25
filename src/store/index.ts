import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState } from "types/reducer/common";
import HomeReducer from "features/Home/Home.reducer";

export const commonState: CommonState = {
  isLoading: false,
  isCallingApi: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState: commonState,
  reducers: {
    setIsLoading: (state: CommonState, actions: PayloadAction<boolean>) => {
      state.isLoading = actions.payload;
    },
    setIsCallingApi: (state: CommonState, actions: PayloadAction<boolean>) => {
      state.isCallingApi = actions.payload;
    },
  },
});

export const CommonActions = commonSlice.actions;

const store = configureStore({
  reducer: {
    common: commonSlice.reducer,
    home: HomeReducer,
  },
});

export default store;
