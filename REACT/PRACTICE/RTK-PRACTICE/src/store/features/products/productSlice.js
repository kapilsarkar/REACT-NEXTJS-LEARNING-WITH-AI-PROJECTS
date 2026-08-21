import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//1. Define the Async thunk
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts", async (_, thunkAPI) => {
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            if (!res.ok) {
                throw new Error("Failed to Fetch Products from API");
            }
            return await res.json();

        } catch (err) {
            return thunkAPI.rejectWithValue(err.message || "Something went wrong")
        }
    }
)

//2. Create the Slice
const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default productSlice.reducer;