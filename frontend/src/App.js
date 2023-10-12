import { Routes, Route, Navigate } from 'react-router-dom';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { publicRoutes, privateRoutes } from '@/routes';
import DefaultLayout from '@/Layouts/DefaultLayout';
import NotFound from '@/pages/NotFound';
import { LOCAL_STORAGE_KEY } from '@/constants';
import { initializeBlogs } from '@/reducers/blogReducer';
import { fetchUserDataByUserName } from '@/reducers/userReducer';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeBlogs());
    }, []);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        if (user) {
            dispatch(fetchUserDataByUserName(user.username));
        }
    }, []);

    const renderRoute = (route, index) => {
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
    };

    const handlePrivateRoutes = () => {
        const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        return privateRoutes.map((route, index) => {
            if (!user) {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        element={<Navigate replace to="/login" />}
                    />
                );
            }

            return renderRoute(route, index);
        });
    };

    return (
        <div className="App">
            <Routes>
                {publicRoutes.map((route, index) => {
                    return renderRoute(route, index);
                })}
                {handlePrivateRoutes()}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
