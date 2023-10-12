import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container } from '@mui/system';
import { Button } from '@mui/material';

import './Header.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';
import { LOCAL_STORAGE_KEY } from '@/constants';

import MainButton from '@/components/buttons/MainButton';
import Logo from '@/components/Logo';
import UserButton from '@/components/buttons/UserButton';

const Header = () => {
    const navbarListWithoutUser = [
        {
            name: 'Blogs',
            link: '/blogs',
        },
        {
            name: 'Users',
            link: '/users',
        },
        {
            name: 'Write',
            link: '/write',
        },
        {
            name: 'Log In',
            link: '/login',
        },
    ];

    const navbarListWithUser = [
        {
            name: 'Blogs',
            link: '/blogs',
        },
        {
            name: 'Users',
            link: '/users',
        },
        {
            name: 'Write',
            link: '/write',
        },
    ];

    const user = useSelector((state) => state.user.data);
    const [onScroll, setOnScroll] = useState(false);
    const [navbarList, setNavbarList] = useState(navbarListWithoutUser);

    useEffect(() => {
        const onScroll = () => {
            const offsetY = window.pageYOffset;

            if (offsetY > 0) {
                setOnScroll(true);
            } else {
                setOnScroll(false);
            }
        };
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    useEffect(() => {
        if (user) {
            setNavbarList(navbarListWithUser);
        } else {
            setNavbarList(navbarListWithoutUser);
        }
    }, []);

    return (
        <div
            className={`default-layout__header ${
                onScroll ? 'on-scroll' : 'no-scroll'
            }`}
        >
            <Container
                maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
                sx={{
                    paddingY: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Logo className="default-layout__header-logo" />
                <Container
                    sx={{
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                    }}
                    className="default-layout__navbar"
                >
                    {navbarList.map((item, index) => (
                        <Button
                            component={Link}
                            to={item.link}
                            key={index}
                            className="default-layout__navbar-item"
                        >
                            {item.name}
                        </Button>
                    ))}
                    {user ? (
                        <UserButton user={user} />
                    ) : (
                        <MainButton
                            to="/signup"
                            className="default-layout__navbar-button"
                        >
                            Get started
                        </MainButton>
                    )}
                </Container>
            </Container>
        </div>
    );
};

export default Header;
