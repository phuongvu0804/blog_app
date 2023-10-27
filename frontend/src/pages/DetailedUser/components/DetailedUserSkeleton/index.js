import React from 'react';

import './DetailedUserSkeleton.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants/appSettings';

import { BlogItemSkeleton } from '../BlogItem';
import { UserInfoSkeleton } from '@/layouts/UserRelatedLayout/components/UserInfo';

import { Container, Skeleton } from '@mui/material';

const DetailedUserSkeleton = () => {
    const renderBlogs = () => {
        return Array.apply(null, Array(6)).map((item, index) => (
            <BlogItemSkeleton key={index} />
        ));
    };

    return (
        <Container
            maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            className="user__container"
        >
            <div className="user__wrapper">
                <Skeleton
                    className="user__title"
                    component="h1"
                    variant="rounded"
                    width={310}
                    height={52}
                />
                <UserInfoSkeleton className="hide-on-pc" />
                <div className="user__blog-list">{renderBlogs()}</div>
            </div>
            <div className="user__wrapper hide-on-tablet-mobile">
                <UserInfoSkeleton />
            </div>
        </Container>
    );
};

export default DetailedUserSkeleton;
