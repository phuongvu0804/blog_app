import React from 'react';
import { Link } from 'react-router-dom';

import './UserItem.scss';
import { handleConvertBinaryData } from '@/utils/binaryDataUtils';

import { Box, Skeleton } from '@mui/material';

import Image from '@/components/Image';
import { MainButtonSkeleton } from '@/components/buttons/MainButton';

export const UserItemSkeleton = () => {
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
                    <Skeleton
                        component="img"
                        variant="circular"
                        className="user-item__img"
                        width={48}
                        height={48}
                    />
                    <MainButtonSkeleton
                        className="hide-on-tablet-pc user-item__btn"
                        width={70}
                        height={38}
                    />
                </div>
                <div className="user-item__content">
                    <Skeleton
                        component="h5"
                        variant="text"
                        height={22}
                        width={100}
                    />
                    <Skeleton
                        component="p"
                        variant="text"
                        height={40}
                        width={150}
                    />
                </div>
            </div>
            <MainButtonSkeleton
                className="hide-on-mobile user-item__btn"
                width={70}
                height={38}
            />
        </Box>
    );
};

const UserItem = ({ userData }) => {
    const imageSrc = handleConvertBinaryData(userData.image?.data);

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
                    <Image className="user-item__img" src={imageSrc} />
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
