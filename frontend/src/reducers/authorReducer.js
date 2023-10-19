const { createSlice } = require('@reduxjs/toolkit');
import userService from '@/services/user.js';
import { setNoti } from './notiReducer';

const initialState = {
    loading: false,
    data: null,
    error: null,
};

const authorSlice = createSlice({
    name: 'author',
    initialState,
    reducers: {
        getAuthorDataRequest(state) {
            return { ...state, loading: true };
        },
        getAuthorDataSuccess(state, action) {
            return { ...state, loading: false, data: action.payload };
        },
        getAuthorDataFail(state, action) {
            return { ...state, loading: false, error: action.payload };
        },
    },
});

export const fetchAuthorData = (id) => {
    return async (dispatch) => {
        dispatch(getAuthorDataRequest());

        try {
            const response = await userService.getUserById(id);
            dispatch(getAuthorDataSuccess(response));
        } catch (err) {
            dispatch(getAuthorDataFail(err));
            dispatch(
                setNoti({
                    content: err.message,
                    type: 'error',
                }),
            );
        }
    };
};

export const { getAuthorDataRequest, getAuthorDataSuccess, getAuthorDataFail } =
    authorSlice.actions;

export default authorSlice.reducer;
