import { createSlice } from "@reduxjs/toolkit";
import { HomeState } from "types/reducer/home";

export const homeState: HomeState = {};

export const homeSlice = createSlice({
  name: "home",
  initialState: homeState,
  reducers: {},
});

export const HomeActions = homeSlice.actions;

export const HomeAsyncActions = {};

export default homeSlice.reducer;
