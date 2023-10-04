import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import App from './App';
import GlobalStyles from '@/components/GlobalStyles';
import blogReducer from '@/reducers/blogReducer';
import notiSlice from '@/reducers/notiReducer';
import userSlice from '@/reducers/userReducer';
import Loading from '@/pages/Loading';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
    reducer: {
        blogs: blogReducer,
        noti: notiSlice,
        user: userSlice,
    },
});

root.render(
    <React.StrictMode>
        <Suspense fallback={<Loading />}>
            <Router>
                <Provider store={store}>
                    <GlobalStyles>
                        <App />
                    </GlobalStyles>
                </Provider>
            </Router>
        </Suspense>
    </React.StrictMode>,
);
