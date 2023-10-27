import React, { memo } from 'react';

import './UserInfo.scss';

import Footer from '@/components/Footer';
import { Skeleton } from '@mui/material';

import { FooterSkeleton } from '@/components/Footer';
import Avatar from '@/components/Avatar';

export const UserInfoSkeleton = ({ className }) => {
    return (
        <div className={`user-info__container ${className ? className : ''}`}>
            <div className="user-info__top">
                <Skeleton
                    className="user-info__img"
                    variant="circular"
                    width={88}
                    height={88}
                />

                <div>
                    <Skeleton
                        className="user-info__name"
                        variant="text"
                        sx={{ fontSize: '1.6rem' }}
                        width={100}
                    />
                    <Skeleton
                        className="user-info__description"
                        variant="rounded"
                        width={200}
                        height={80}
                    />
                </div>
            </div>
            <FooterSkeleton className="user-info__footer" />
        </div>
    );
};

const UserInfo = ({ className, data }) => {
    console.log('UserInfo', data);
    return (
        <div className={`user-info__container ${className ? className : ''}`}>
            <div className="user-info__top">
                <div>
                    <Avatar
                        imageData={data?.image}
                        className="user-info__img"
                    />
                </div>
                <div>
                    <h6 className="user-info__name">{data.name}</h6>
                    <p className="user-info__description">{data.description}</p>
                </div>
            </div>
            <Footer className="user-info__footer" />
        </div>
    );
};

export default memo(UserInfo);
