import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    "data":{},
    "token":""
  },
  reducers: {
    setUserData: (state, action) => {state.data = action.payload},
    setUserToken: (state, action) => {state.token = action.payload}
  }
});

export const { setUserData, setUserToken } = userDataSlice.actions;
export default userDataSlice.reducer;