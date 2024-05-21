import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isConnected: false,
  },
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    ChangeConnectionState: (state) => {
      state.value.isConnected = !state.value.isConnected;
    },
  },
});

export const { ChangeConnectionState } = usersSlice.actions;
export default usersSlice.reducer;
