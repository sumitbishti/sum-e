import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    loading: false,
    allPosts: [],
    searchText: '',
    searchedResults: [],
    searchTimeout: null
}

export const fetchPosts = createAsyncThunk('homePage/fetchPosts', async (arg, thunkAPI) => {
    try {
        const response = await axios.get(
            "https://sum-e-server.vercel.app/api/v1/post"
        );
        if (response.data.data.length > 0) {
            return response.data.data.reverse()
        }
    } catch (err) {
        alert(err);
    }
})

const homePageSlice = createSlice({
    name: 'homePage',
    initialState,
    reducers: {
        setSearchText: (state, action) => {
            state.searchText = action.payload
        },
        setSearchTimeout: (state, action) => {
            state.searchTimeout = action.payload
        },
        setSearchedResults: (state, action) => {
            state.searchedResults = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.allPosts = action.payload
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
            })

    }
})

export const { setSearchText, setSearchTimeout, setSearchedResults } = homePageSlice.actions
export default homePageSlice.reducer