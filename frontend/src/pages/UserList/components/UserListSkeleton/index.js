import React from 'react';

import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants/appSettings';

import { Grid } from '@mui/material';
import { Container } from '@mui/system';

import { UserItemSkeleton } from '../UserItem';
import { RecommendationTopicsSkeleton } from '@/components/RecommendationTopics';

const UserListSkeleton = () => {
    return (
        <Container
            maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            className="user-list__container"
        >
            <h1 className="user-list__title">List of users</h1>
            <Grid container spacing={6}>
                <Grid item xs={12} md={8} className="user-list__wrapper">
                    {Array.apply(null, Array(3)).map((item, index) => (
                        <UserItemSkeleton key={index} />
                    ))}
                </Grid>
                <Grid
                    item
                    md={4}
                    className="user-list__wrapper  hide-on-tablet-mobile"
                >
                    <RecommendationTopicsSkeleton />
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserListSkeleton;
