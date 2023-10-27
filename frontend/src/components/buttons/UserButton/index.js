import { Fragment, memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Popover from '@mui/material/Popover';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Avatar, Button, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './UserButton.scss';
import { handleConvertBinaryData } from '@/utils/binaryDataUtils';
import { actLogOut } from '@/reducers/userReducer';
import { navbarListWithUser } from '@/constants/navbarLists';
import { profileLinks, topButtonsInitialValue } from '@/constants/userButtons';

import Image from '@/components/Image';

const UserButton = ({ user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [topButtons, setTopButtons] = useState(topButtonsInitialValue);
    const userSrc = handleConvertBinaryData(user?.image?.data);

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
        dispatch(actLogOut(navigate));
        handleClose();
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
                            component={Link}
                            to="/signup"
                        >
                            Sign up
                        </Button>
                        <Button
                            className="profile-popover__btn--outlined"
                            variant="outlined"
                            component={Link}
                            to="/login"
                        >
                            Sign in
                        </Button>
                    </div>
                </div>
            );
        }
    };

    const renderAvatar = () => {
        if (user) {
            return (
                <Fragment>
                    <Image src={userSrc} />
                    <KeyboardArrowDownOutlinedIcon />
                </Fragment>
            );
        } else {
            return <AccountCircleIcon className="header__profile-avatar" />;
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
                {renderAvatar()}
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

UserButton.propTypes = {
    user: PropTypes.object,
};

export default memo(UserButton);
