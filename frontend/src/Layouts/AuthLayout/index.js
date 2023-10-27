import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './AuthLayout.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants/appSettings';

import { Container } from '@mui/system';

import Logo from '@/components/Logo';

const AuthLayout = ({ children }) => {
    const { pathname } = useLocation();
    const direction = { path: '/login' };
    let title = '';
    if (pathname === '/login') {
        title = 'Welcome back';
        direction.link = 'Sign up';
        direction.path = '/signup';
        direction.text = 'No account?';
    } else if (pathname === '/signup') {
        title = 'Join Medium';
        direction.link = 'Log In';
        direction.path = '/login';
        direction.text = 'Already have an account?';
    }

    return (
        <div className="auth-layout__wrapper">
            <header className="auth-layout__header">
                <Container
                    className="auth-layout__header-container"
                    maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
                >
                    <Logo className="auth-layout__logo" />
                </Container>
            </header>
            <Container maxWidth="xs" className="auth-layout__container">
                <h1 className="auth-layout__title">{title}</h1>
                <div className="auth-layout__content">{children}</div>
                <p className="auth-layout__text">
                    {direction.text}{' '}
                    <Link to={direction.path}>{direction.link}</Link>
                </p>
                <p className="auth-layout__policy">
                    Click <Link to={direction.path}>{direction.link}</Link> to
                    agree to Medium’s <Link>Terms of Service</Link> and
                    acknowledge that Medium’s <Link>Privacy Policy</Link>{' '}
                    applies to you.
                </p>
            </Container>
        </div>
    );
};

export default AuthLayout;
