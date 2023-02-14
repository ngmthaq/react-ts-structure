import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Notification, CommonState } from "spec/common.reducer";
import { ThemeMode } from "spec/theme";

export const name: string = "common";

export const initialState: CommonState = {
  isLoading: false,
  notification: null,
  mode: "light",
};

export const commonSlice = createSlice({
  name: name,
  initialState: initialState,
  reducers: {
    setter: (state, action: PayloadAction<object>) => {
      state = Object.assign(state, action.payload);
    },
    openLoading: state => {
      state.isLoading = true;
    },
    closeLoading: state => {
      state.isLoading = false;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notification = action.payload;
    },
    removeNotification: state => {
      state.notification = null;
    },
    changeThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
    },
  },
});

export const commonActions = commonSlice.actions;

export const commonAsyncActions = {
  // https://redux-toolkit.js.org/usage/usage-guide#defining-async-logic-in-slices
};

export default commonSlice.reducer;
