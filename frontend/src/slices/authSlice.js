// Desc: Auth slice to handle user login and logout

import { createSlice } from "@reduxjs/toolkit";



// localStorage get usserInfo from local storage if it exists, else set it to null
// its gonna be stored in local storage as a string, so we need to parse it back to javascript object

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
// then we need to sent the useIinfo to the payload (action.payload)
    setCredentials: (state, action) => { // setCredentials right after registration also logs the user in immediately by storing their credentials in the state, enabling instant access without requiring a separate login step.
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      // and the user gets put in the local storage user name and password 
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo"); // Clear userInfo only
      localStorage.removeItem("cart");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;


export default authSlice.reducer;