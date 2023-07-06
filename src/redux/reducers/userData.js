import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  token: "",
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    setUserFavorites: (state, action) => {
      state.data.favorites = action.payload;
    },
    loginUser: (state, action) => {
      state.data = action.payload.userData;
      state.token = action.payload.token;
    },
    logoutUser: (state, action) => {
      return initialState;
    },
  },
});

export const { setUserData, setUserFavorites, loginUser, logoutUser } =
  userDataSlice.actions;
export default userDataSlice.reducer;
