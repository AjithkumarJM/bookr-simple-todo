import { createSlice } from "@reduxjs/toolkit";

const loadAuthFromLocalStorage = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  return isAuthenticated === "true";
};

const saveAuthToLocalStorage = (isAuthenticated) => {
  localStorage.setItem("isAuthenticated", isAuthenticated);
};

const initialState = {
  isAuthenticated: loadAuthFromLocalStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      saveAuthToLocalStorage(true);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      saveAuthToLocalStorage(false);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
