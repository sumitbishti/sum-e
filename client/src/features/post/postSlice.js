import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    form: {
        name: '',
        prompt: '',
        photo: ''
    },
    generatingImg: false,
    loading: false
}

export const postImage = createAsyncThunk('post/postImage', async (arg, thunkAPI) => {
    const state = thunkAPI.getState()
    try {
        await axios.post("https://sum-e-server.vercel.app/api/v1/post", {
            name: state.post.form.name,
            photo: state.post.form.photo,
            prompt: state.post.form.prompt,
        });
        arg("/");
    } catch (err) {
        alert(err);
    }
})

export const generateImageReducer = createAsyncThunk('post/generateImageReducer', async (arg, thunkAPI) => {
    const state = thunkAPI.getState()
    try {
        const response = await axios.post(
            "https://sum-e-server.vercel.app/api/v1/dalle",
            {
                prompt: state.post.form.prompt,
            }
        );
        return response.data.photo;
    } catch (err) {
        console.log(err)
        alert(err);
        alert(err.response.data);
    }
})

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setForm: (state, action) => {
            state.form = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postImage.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(postImage.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(postImage.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(generateImageReducer.pending, (state, action) => {
                state.generatingImg = true;
            })
            .addCase(generateImageReducer.fulfilled, (state, action) => {
                state.generatingImg = false;
                state.form = {
                    ...state.form,
                    photo: `data:image/jpeg;base64,${action.payload}`,
                };
            })
            .addCase(generateImageReducer.rejected, (state, action) => {
                state.generatingImg = false;
            })
    }
})

export const { setForm } = postSlice.actions
export default postSlice.reducer