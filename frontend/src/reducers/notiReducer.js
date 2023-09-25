const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
    content: null,
    type: 'infor',
};

const notiSlice = createSlice({
    name: 'noti',
    initialState,
    reducers: {
        appendNoti(state, action) {
            return {
                content: action.payload.content,
                type: action.payload.type,
            };
        },
        removeNoti(state) {
            return {
                ...state,
                content: null,
            };
        },
    },
});

export const setNoti = (noti, timming = 5000) => {
    return async (dispatch) => {
        dispatch(appendNoti(noti));

        setTimeout(() => {
            dispatch(removeNoti());
        }, timming);
    };
};

export const { appendNoti, removeNoti } = notiSlice.actions;
export default notiSlice.reducer;
