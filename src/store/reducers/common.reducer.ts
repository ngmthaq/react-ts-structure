import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonState, Notification } from "types/reducer/common";

export const commonState: CommonState = {
  isLoading: false,
  isCallingApi: false,
  notification: null,
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
    setNotification: (state: CommonState, actions: PayloadAction<Notification>) => {
      state.notification = actions.payload;
    },
  },
});

export const CommonActions = commonSlice.actions;

export default commonSlice.reducer;
