import React from 'react';

import './UserInfo.scss';

import Footer from '@/components/Footer';
import Image from '@/components/Image';
import { Skeleton } from '@mui/material';

import { FooterSkeleton } from '@/components/Footer';

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
                        height={80}
                    />
                </div>
            </div>
            <FooterSkeleton className="user-info__footer" />
        </div>
    );
};

const UserInfo = ({ className, data }) => {
    return (
        <div className={`user-info__container ${className ? className : ''}`}>
            <div className="user-info__top">
                <Image className="user-info__img" src={data.image} />
                <div>
                    <h6 className="user-info__name">{data.name}</h6>
                    <p className="user-info__description">{data.description}</p>
                </div>
            </div>
            <Footer className="user-info__footer" />
        </div>
    );
};

export default UserInfo;
