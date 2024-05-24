import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    addexerciseToStore: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addexerciseToStore } = exercisesSlice.actions;
export default exercisesSlice.reducer;
