import { createSlice } from '@reduxjs/toolkit';

import blogService from '@/services/blog';
import { setNoti } from './notiReducer';

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        setBlog(state, action) {
            return action.payload;
        },
    },
});

export const initializeBlogs = () => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll();
            dispatch(setBlog(blogs));
        } catch (err) {
            setNoti({
                content: err.response.data.error,
                type: 'error',
            });
        }
    };
};

export const { setBlog } = blogSlice.actions;
export default blogSlice.reducer;
