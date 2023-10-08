import { createSlice } from '@reduxjs/toolkit';

import blogService from '@/services/blog';
import { setNoti } from './notiReducer';

const initialState = {
    loading: false,
    data: [],
    error: null,
};

const blogSlice = createSlice({
    name: 'blog',
    initialState: initialState,
    reducers: {
        getBlogsRequest(state) {
            return {
                ...state,
                loading: true,
            };
        },
        getBlogsSuccess(state, action) {
            return {
                ...state,
                loading: false,
                data: action.payload,
            };
        },
        getBlogsFail(state, action) {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        },
    },
});

export const initializeBlogs = () => {
    return async (dispatch) => {
        dispatch(getBlogsRequest());
        try {
            const blogs = await blogService.getAll();
            dispatch(getBlogsSuccess(blogs));
        } catch (err) {
            dispatch(getBlogsFail(err.response.data.error));
            setNoti({
                content: err.response.data.error,
                type: 'error',
            });
        }
    };
};

export const { getBlogsRequest, getBlogsSuccess, getBlogsFail } =
    blogSlice.actions;
export default blogSlice.reducer;
