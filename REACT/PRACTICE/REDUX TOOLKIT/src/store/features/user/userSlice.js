import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: [],
    loading: false,
    error: null,
}

const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await response.json();
        console.log(data);
        return data;
    }
)

//user//fetchUser/pending
//user//fetchUser/fullfilled
//user//fetchUser/rejected

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (addBuilder) => {
        addBuilder.addCase(fetchUser.pending, (state, action) => {
            state.loading = true;
            state.error = null;
            
        }),
            addBuilder.addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            }),
            addBuilder.addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export { fetchUser }
export default userSlice.reducer