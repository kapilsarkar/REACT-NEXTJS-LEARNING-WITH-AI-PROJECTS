import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  name: "Kapil Sarkar",
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      // Prevents negative values in state
      if (state.value > 0) {
        state.value -= 1;
      }
    },
    reset: (state) => {
      state.value = 0;
    },
    changeByValue: (state, action) => {
      const parsed = Number(action.payload) || 0;
      // Ensures manual updates can never set a negative number
      state.value = Math.max(0, parsed);
    },
    changeName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { increment, decrement, reset, changeByValue, changeName } = counterSlice.actions;
export default counterSlice.reducer;