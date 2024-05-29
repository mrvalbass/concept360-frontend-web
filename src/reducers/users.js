import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    ChangeConnectionState: (state, action) => {
      !localStorage.getItem("token")
        ? localStorage.setItem("token", action.payload)
        : localStorage.removeItem("token");
    },
    setUserData: (state, action) => {
      state.value = action.payload;
    },
    updatePicture: (state, action) => {
      state.value.user.profilePictureURL = action.payload;
    },
  },
});

export const { ChangeConnectionState, setUserData, updatePicture } =
  usersSlice.actions;
export default usersSlice.reducer;
