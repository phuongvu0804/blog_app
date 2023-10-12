import React from 'react';
import { Link } from 'react-router-dom';

import Image from '@/components/Image';

import './UserItem.scss';
import { Box } from '@mui/material';
const UserItem = ({ userData }) => {
    return (
        <Box className="user-item">
            <div className="user-item__wrapper">
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Image className="user-item__img" src={userData.image} />
                    <Link
                        className="hide-on-tablet-pc user-item__btn"
                        to={`/users/${userData.id}`}
                    >
                        More
                    </Link>
                </div>
                <div className="user-item__content">
                    <h5>
                        {userData.name.charAt(0).toUpperCase() +
                            userData.name.slice(1)}
                    </h5>
                    <p>{userData.description || 'User has no bio'}</p>
                </div>
            </div>
            <Link
                className="hide-on-mobile user-item__btn"
                to={`/users/${userData.id}`}
            >
                More
            </Link>
        </Box>
    );
};

export default UserItem;
