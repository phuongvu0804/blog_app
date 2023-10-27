const { createSlice } = require('@reduxjs/toolkit');

const tokenSlice = createSlice({
    name: 'token',
    initialState: '',
    reducers: {
        setTokenExpiration(state, action) {
            return action.payload;
        },
        removeTokenExpiration() {
            return null;
        },
    },
});

export const { setTokenExpiration, removeTokenExpiration } = tokenSlice.actions;
export default tokenSlice.reducer;
