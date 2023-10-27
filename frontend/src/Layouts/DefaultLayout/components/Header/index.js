import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Container } from '@mui/system';
import { Button } from '@mui/material';

import './Header.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants/appSettings';
import {
    navbarListWithoutUser,
    navbarListWithUser,
} from '@/constants/navbarLists';

import MainButton from '@/components/buttons/MainButton';
import Logo from '@/components/Logo';
import UserButton from '@/components/buttons/UserButton';

const Header = () => {
    const user = useSelector((state) => state.user.data);
    const [onScroll, setOnScroll] = useState(false);

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

    const renderButtons = useCallback(() => {
        if (user) {
            return <UserButton user={user} />;
        } else {
            return (
                <MainButton
                    to="/signup"
                    className="default-layout__navbar-button"
                >
                    Get started
                </MainButton>
            );
        }
    }, [user]);

    const renderNavBar = useCallback(() => {
        let navBar = navbarListWithoutUser;

        if (user) {
            navBar = navbarListWithUser;
        }
        return navBar.map((item, index) => (
            <Button
                component={Link}
                to={item.link}
                key={index}
                className="default-layout__navbar-item"
            >
                {item.name}
            </Button>
        ));
    }, [user]);

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
                    {renderNavBar()}
                    {renderButtons()}
                </Container>
            </Container>
        </div>
    );
};

export default Header;
