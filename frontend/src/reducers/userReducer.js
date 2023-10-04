const { createSlice } = require('@reduxjs/toolkit');

import userService from '@/services/user';
import { setNoti } from './notiReducer';
const initialState = {
    username: '',
    name: '',
    blogs: [],
    id: '',
    savedBlogs: [],
    likedBlogs: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        appendUser(state, action) {
            return { ...state, ...action.payload };
        },
        removeUser() {
            return null;
        },
        appendSavedBlog(state, action) {
            return { ...state, savedBlogs: action.payload };
        },
    },
});

export const fetchUserData = (id) => {
    return async (dispatch) => {
        try {
            const userDetails = await userService.getUserById(id);
            dispatch(appendUser(userDetails));
        } catch (err) {
            setNoti({
                content: err.response.data.error,
                type: 'error',
            });
        }
    };
};

export const { appendUser, removeUser, appendSavedBlog } = userSlice.actions;
export default userSlice.reducer;
