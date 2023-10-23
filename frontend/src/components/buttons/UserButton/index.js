import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Popover from '@mui/material/Popover';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutIcon from '@mui/icons-material/Logout';

import './UserButton.scss';
import { handleConvertBinaryData } from '@/utils/binaryDataUtils';

import { Button, IconButton } from '@mui/material';
import Image from '@/components/Image';
import { LOCAL_STORAGE_KEY } from '@/constants';
import { useDispatch } from 'react-redux';
import { removeUser } from '@/reducers/userReducer';
import { navbarListWithUser } from '@/constants';

const UserButton = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userSrc = handleConvertBinaryData(user.image?.data);

    const profileLinks = [
        {
            content: 'Become a member',
            to: '/',
        },
        {
            content: 'Create a Mastodon account',
            to: '/',
        },
        {
            content: 'Apply for author verification',
            to: '/',
        },
        {
            content: 'Apply to the Partner Program',
            to: '/',
        },
        {
            content: 'Gift a membership',
            to: '/',
        },
    ];

    const topButtonsInitialValue = [
        {
            name: 'Profile',
            icon: PersonOutlineOutlinedIcon,
            link: '/profile',
            variant: 'text',
            className: '',
        },
    ];

    const [topButtons, setTopButtons] = useState(topButtonsInitialValue);

    useEffect(() => {
        if (window.innerWidth <= 739) {
            setTopButtons([...topButtons, ...navbarListWithUser]);
        } else {
            setTopButtons(topButtonsInitialValue);
        }
    }, [window.innerWidth]);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = () => {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        handleClose();
        navigate('/');
        dispatch(removeUser());
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const renderPopoverByUser = () => {
        if (user) {
            return (
                <div className="profile-popover__top-wrapper">
                    {topButtons.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Button
                                className={`header__nav-item ${
                                    item.className && item.className
                                }`}
                                key={index}
                                component={Link}
                                to={item.link}
                                variant={item.variant || 'text'}
                                startIcon={item.icon ? <Icon /> : ''}
                            >
                                {item.name}
                            </Button>
                        );
                    })}
                    <Button
                        className="header__nav-item"
                        component={Link}
                        variant="text"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogOut}
                    >
                        Log out
                    </Button>
                </div>
            );
        } else {
            return (
                <div>
                    <h4>Get started on Medium</h4>
                    <div className="profile-popover__top">
                        <Button
                            className="profile-popover__btn--contained"
                            variant="contained"
                        >
                            Sign up
                        </Button>
                        <Button
                            className="profile-popover__btn--outlined"
                            variant="outlined"
                        >
                            Sign in
                        </Button>
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            <IconButton
                aria-describedby={id}
                variant="outlined"
                onClick={handleClick}
                className="header__profile-btn"
            >
                <Image src={userSrc} />
                <KeyboardArrowDownOutlinedIcon />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                className="header__profile-popover"
            >
                <div className="profile-popover__container">
                    {renderPopoverByUser()}
                    <ul className="profile-popover__bottom">
                        {profileLinks.map((item, index) => (
                            <li key={index}>
                                <Link to={item.to}>{item.content}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </Popover>
        </div>
    );
};

export default UserButton;
