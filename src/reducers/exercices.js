import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const exercicesSlice = createSlice({
  name: "exercices",
  initialState,
  reducers: {
    addExerciceToStore: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addExerciceToStore } = exercicesSlice.actions;
export default exercicesSlice.reducer;
