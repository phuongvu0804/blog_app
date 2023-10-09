const { createSlice } = require('@reduxjs/toolkit');

import userService from '@/services/user';
import authService from '@/services/auth';
import { setNoti } from './notiReducer';
import { LOCAL_STORAGE_KEY } from '@/constants';

const initialState = {
    loading: false,
    data: null,
    savedBlogs: [],
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
            setNoti({
                content: err.message,
                type: 'error',
            });
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
            setNoti({
                content: err.message,
                type: 'error',
            });

            dispatch(getUserDataFail(err));
        }
    };
};

export const actLogin = (user, navigate) => {
    return async (dispatch) => {
        try {
            const userDetails = await authService.login(user);

            dispatch(getUserDataSuccess(userDetails));
            localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(userDetails),
            );

            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            setNoti({
                content: err.message,
                type: 'error',
            });

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
