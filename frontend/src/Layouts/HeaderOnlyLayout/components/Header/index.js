import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './Header.scss';
import images from '@/assets/images';

import SearchField from '../SearchField';
import UserButton from '@/components/buttons/UserButton';
import Image from '@/components/Image';

import { Button } from '@mui/material';
import { Container } from '@mui/system';
import { useSelector } from 'react-redux';
import { buttonListNoUser, buttonListWithUser } from '@/constants/buttonLists';
const Header = ({ className }) => {
    const user = useSelector((state) => state.user.data);

    const renderButtons = () => {
        let buttonList = buttonListNoUser;
        if (user) {
            buttonList = buttonListWithUser;
        }

        return buttonList.map((item, index) => {
            const Icon = item.icon;
            return (
                <Button
                    className={`header__nav-item ${
                        item.className && item.className
                    }`}
                    key={index}
                    component={Link}
                    to={item.to}
                    variant={item.variant}
                    startIcon={item.icon ? <Icon /> : ''}
                >
                    {item.text}
                </Button>
            );
        });
    };
    return (
        <header className={`header ${className}`}>
            {!user && (
                <Container
                    maxWidth="lg"
                    className="header__auth-btns hide-on-pc"
                >
                    <Button
                        className="header__nav-item header__nav-item--contained"
                        component={Link}
                        to="/signup"
                        variant="contained"
                    >
                        Sign up
                    </Button>
                    <Button
                        className="header__nav-item header__nav-item--text"
                        component={Link}
                        to="/login"
                        variant="text"
                    >
                        Sign in
                    </Button>
                </Container>
            )}

            <Container maxWidth="lg" className="header__container">
                <div className="header__left">
                    <Link className="header__logo" to="/">
                        <Image src={images.logoIcon} />
                    </Link>
                    <SearchField className="hide-on-mobile" />
                </div>
                <div className="header__right">
                    {renderButtons()}
                    <UserButton user={user} />
                </div>
            </Container>

            <Container maxWidth="lg">
                <SearchField className="hide-on-tablet-pc" />
            </Container>
        </header>
    );
};

Header.propTypes = {
    className: PropTypes.string,
};
export default Header;
