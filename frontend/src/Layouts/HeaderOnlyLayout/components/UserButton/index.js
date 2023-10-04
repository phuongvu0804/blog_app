import * as React from 'react';
import { Link } from 'react-router-dom';

import Popover from '@mui/material/Popover';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

import './UserButton.scss';
import { Button, IconButton } from '@mui/material';
import Image from '@/components/Image';
import images from '@/assets/images';

const UserButton = ({ user }) => {
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

    const profileButtons = [
        {
            text: 'Profile',
            icon: PersonOutlineOutlinedIcon,
            to: `/users/${user?.id}`,
            variant: 'text',
            className: '',
        },
        {
            text: 'Stories',
            icon: DescriptionOutlinedIcon,
            to: '/',
            variant: 'text',
            className: '',
        },
    ];

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const renderPopoverByUser = () => {
        if (user) {
            return (
                <div className="profile-popover__top-wrapper">
                    {profileButtons.map((item, index) => {
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
                <Image src={images.userAvatar} />
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
