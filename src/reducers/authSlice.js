import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  redirectUrl: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = { ...action.payload };
    },
    refresh: (state, action) => {
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.redirectUrl = true;
      state.user = { ...action.payload };
    },
  },
});

export const { login, refresh, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
