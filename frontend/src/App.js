import { Routes, Route, Navigate } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { publicRoutes, privateRoutes } from '@/routes';
import { initializeBlogs } from '@/reducers/blogReducer';
import { fetchUserDataByUserName } from '@/reducers/userReducer';
import { setTokenExpiration } from '@/reducers/tokenReducer';
import { parseJwt } from '@/utils/functions';
import { LOCAL_STORAGE_KEY } from '@/constants/appSettings';

import DefaultLayout from '@/layouts/DefaultLayout';
import NotFound from '@/pages/NotFound';
import AuthVerify from '@/common/AuthVerify';

function App() {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    useEffect(() => {
        const controller = new AbortController();
        dispatch(initializeBlogs());

        return () => {
            controller.abort();
        };
    }, []);

    //Check if user has logged in already
    useEffect(() => {
        if (user) {
            const decodedToken = parseJwt(user.token);

            if (decodedToken && decodedToken.exp) {
                const tokenExpiration = decodedToken.exp * 1000;
                dispatch(setTokenExpiration(tokenExpiration));
                dispatch(fetchUserDataByUserName(user.username));
            } else {
                console.log(
                    'JWT does not contain an expiration claim ("exp").',
                );
            }
        }
    }, [user]);

    const renderRoutes = (routes) => {
        return routes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
                Layout = route.layout;
            } else if (route.layout === null) {
                Layout = Fragment;
            }

            return (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <Layout>
                            <Page />
                        </Layout>
                    }
                />
            );
        });
    };

    return (
        <div className="App">
            <Routes>
                {renderRoutes(publicRoutes)}
                {user ? (
                    renderRoutes(privateRoutes)
                ) : (
                    <Route
                        path="*"
                        element={<Navigate replace to="/login" />}
                    />
                )}
                <Route path="*" element={<NotFound />} />
            </Routes>
            <AuthVerify />
        </div>
    );
}

export default App;
