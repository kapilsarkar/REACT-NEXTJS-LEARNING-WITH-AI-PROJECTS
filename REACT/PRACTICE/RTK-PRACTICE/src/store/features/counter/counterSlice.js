import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        value: 0,
        name: "Kapil Sarkar",
    },
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            if (state.value > 0) state.value -= 1;
        },
        reset: (state) => {
            state.value = 0
        },
        changeByValue: (state, action) => {
            state.value = action.payload
        },
        changeName: (state, action) => {
            state.name = action.payload
        },
    }
})

export const { increment, decrement, reset, changeByValue, changeName } = counterSlice.actions;
export default counterSlice.reducer;