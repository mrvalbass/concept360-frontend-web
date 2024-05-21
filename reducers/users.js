import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: "",
    userData: null,
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    ChangeConnectionState: (state, action) => {
      !state.value.token
        ? localStorage.setItem("token", action.payload)
        : localStorage.removeItem("token");
    },
    setUserData: (state, action) => {
      state.value.userData = action.payload;
    },
  },
});

export const { ChangeConnectionState, setUserData } = usersSlice.actions;
export default usersSlice.reducer;
