import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './Header.scss';
import images from '@/assets/images';

import SearchField from '../SearchField';
import UserButton from '@/components/buttons/UserButton';
import Image from '@/components/Image';

import { Button } from '@mui/material';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import { Container } from '@mui/system';
const Header = ({ className }) => {
    const buttonListNoUser = [
        {
            text: 'Write',
            icon: NoteAltOutlinedIcon,
            to: '/new-story',
            variant: 'text',
            className: 'mr-32',
        },
        {
            text: 'Sign up',
            icon: null,
            to: '/signup',
            variant: 'contained',
            className: 'header__nav-item--contained hide-on-tablet-mobile',
        },
        {
            text: 'Sign in',
            icon: null,
            to: '/login',
            variant: 'text',
            className: 'header__nav-item--text mr-32 hide-on-tablet-mobile',
        },
    ];

    const buttonListWithUser = [
        {
            text: 'Write',
            icon: NoteAltOutlinedIcon,
            to: '/new-story',
            variant: 'text',
            className: 'mr-32',
        },
    ];

    const user = useSelector((state) => state.user.data);
    const [buttonList, setButtonList] = useState(buttonListNoUser);
    useEffect(() => {
        if (user) {
            setButtonList(buttonListWithUser);
        } else {
            setButtonList(buttonListNoUser);
        }
    }, [user]);

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
                    {buttonList.map((item, index) => {
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
                    })}
                    {user && <UserButton user={user} />}
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
