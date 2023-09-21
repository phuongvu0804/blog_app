import { createSlice } from '@reduxjs/toolkit';

import blogService from '@/services/blog';

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        setBlog(state, action) {
            return action.payload;
        },
    },
});

export const initializeBlogs = (handleError) => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll();
            dispatch(setBlog(blogs));
        } catch (err) {
            handleError(err);
        }
    };
};

export const { setBlog } = blogSlice.actions;
export default blogSlice.reducer;
