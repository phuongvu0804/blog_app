import { lazy } from 'react';
import HeaderOnlyLayout from '@/Layouts/HeaderOnlyLayout';

const Home = lazy(() => import('@/pages/Home'));
const BlogList = lazy(() => import('@/pages/BlogList'));
const UserList = lazy(() => import('@/pages/UserList'));
const DetailedBlog = lazy(() => import('@/pages/DetailedBlog'));
const DetailedUser = lazy(() => import('@/pages/DetailedUser'));
const Login = lazy(() => import('@/pages/Login'));
const SignUp = lazy(() => import('@/pages/SignUp'));
// const LoadingPage = lazy(() => import('@/pages/Loading'));

const publicRoutes = [
    { path: '/', component: Home },
    {
        path: '/blogs/:id',
        component: DetailedBlog,
        layout: HeaderOnlyLayout,
    },
    { path: '/blogs', component: BlogList },
    { path: '/login', component: Login, layout: null },
    { path: '/signup', component: SignUp, layout: null },
    // { path: '/loading', component: LoadingPage, layout: null },
];

const privateRoutes = [
    { path: '/users', component: UserList },
    { path: '/users/:id', component: DetailedUser, layout: HeaderOnlyLayout },
];

export { publicRoutes, privateRoutes };
