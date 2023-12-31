const { createSlice } = require('@reduxjs/toolkit');

import userService from '@/services/user';
import authService from '@/services/auth';
import blogService from '@/services/blog';

import { setNoti } from './notiReducer';
import { LOCAL_STORAGE_KEY } from '@/constants/appSettings';
import { getBlogsSuccess } from './blogReducer';

const initialState = {
    loading: false,
    data: null,
    likedBlogs: [],
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserDataRequest(state) {
            return { ...state, loading: true };
        },
        getUserDataSuccess(state, action) {
            return { ...state, loading: false, data: action.payload };
        },
        getUserDataFail(state, action) {
            return { ...state, loading: false, error: action.payload };
        },
        removeUser(state) {
            return { ...state, data: null };
        },
        appendSavedBlog(state, action) {
            return {
                ...state,
                savedBlogs: [...state.savedBlogs, action.payload],
            };
        },
    },
});

export const fetchUserDataById = (id) => {
    return async (dispatch) => {
        dispatch(getUserDataRequest());
        try {
            const userDetails = await userService.getUserById(id);
            dispatch(getUserDataSuccess(userDetails));
        } catch (err) {
            dispatch(
                setNoti({
                    content: err.message,
                    type: 'error',
                }),
            );
            dispatch(getUserDataFail(err));
        }
    };
};

export const fetchUserDataByUserName = (username) => {
    return async (dispatch) => {
        dispatch(getUserDataRequest());
        try {
            const userList = await userService.getAll();

            const userDetails = userList.filter(
                (item) => item.username === username,
            );

            dispatch(getUserDataSuccess(userDetails[0]));
        } catch (err) {
            dispatch(
                setNoti({
                    content: err.message,
                    type: 'error',
                }),
            );

            dispatch(getUserDataFail(err));
        }
    };
};

export const actLogin = (user, navigate) => {
    return async (dispatch) => {
        try {
            const userDetails = await authService.login(user);

            dispatch(fetchUserDataByUserName(userDetails.username));

            localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(userDetails),
            );

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (err) {
            dispatch(
                setNoti({
                    content: err.message,
                    type: 'error',
                }),
            );

            dispatch(getUserDataFail(err));
        }
    };
};

export const actLogOut = (navigate) => {
    return async (dispatch) => {
        dispatch(removeUser());
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        navigate('/');
    };
};

export const actSaveBlog = (userId, blogId) => {
    return async (dispatch) => {
        dispatch(getUserDataRequest());

        try {
            const response = await userService.updateUser(blogId, {
                userId,
            });
            dispatch(getUserDataSuccess(response));
        } catch (err) {
            dispatch(
                setNoti({
                    content: err.message,
                    type: 'error',
                }),
            );

            dispatch(getUserDataFail(err));
        }
    };
};

export const actLikeBlog = (userId, blogId) => {
    return async (dispatch) => {
        dispatch(getUserDataRequest());

        try {
            const response = await userService.handleLikeBlog(blogId, {
                userId,
            });
            dispatch(getUserDataSuccess(response));

            const blogs = await blogService.getAll();
            dispatch(getBlogsSuccess(blogs));
        } catch (err) {
            dispatch(
                setNoti({
                    content: err.message,
                    type: 'error',
                }),
            );

            dispatch(getUserDataFail(err));
        }
    };
};

export const {
    getUserDataRequest,
    getUserDataSuccess,
    getUserDataFail,
    removeUser,
    appendSavedBlog,
} = userSlice.actions;
export default userSlice.reducer;
