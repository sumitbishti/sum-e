import { configureStore } from '@reduxjs/toolkit'
import homePageReducer from './features/homePage/homePageSlice'
import postReducer from './features/post/postSlice'

const store = configureStore({
    reducer: {
        homePage: homePageReducer,
        post: postReducer
    }
})

export default store