import { Routes, Route, Navigate } from 'react-router-dom';
import { Fragment } from 'react';

import { publicRoutes, privateRoutes } from '@/routes';
import DefaultLayout from '@/Layouts/DefaultLayout';
import NotFound from '@/pages/NotFound';

function App() {
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
        const user = localStorage.getItem('blog_user');
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

            renderRoute(route, index);
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
