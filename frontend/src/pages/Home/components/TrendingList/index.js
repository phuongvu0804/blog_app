import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { Container } from '@mui/system';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Grid, Skeleton } from '@mui/material';

import './TrendingList.scss';
import {
    MAX_WIDTH_DEFAULT_LAYOUT,
    NUMBER_OF_TRENDING_BLOGS,
} from '@/constants/appSettings';

import TrendingItem, { TrendingItemSkeleton } from '../TrendingItem';

export const TrendingListSkeleton = () => {
    return (
        <Container
            maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            className="trending-list__container"
        >
            <Skeleton
                component="h2"
                variant="text"
                width={240}
                height="20px"
                sx={{ marginBottom: '1.6rem' }}
            />
            <Grid container spacing={2} className="trending-list__wrapper">
                {Array.apply(null, Array(NUMBER_OF_TRENDING_BLOGS)).map(
                    (blog, index) => (
                        <TrendingItemSkeleton key={index} />
                    ),
                )}
            </Grid>
        </Container>
    );
};

const TrendingList = ({ data }) => {
    return (
        <Container
            maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            className="trending-list__container"
        >
            <h2 className="sub-title-md">
                <TrendingUpIcon />
                Trending on Medium
            </h2>

            {data ? (
                <Grid container spacing={2} className="trending-list__wrapper">
                    {data.map((blog, index) => (
                        <TrendingItem key={blog.id} blog={blog} index={index} />
                    ))}
                </Grid>
            ) : (
                <p>There is currently no trending blogs</p>
            )}
        </Container>
    );
};

TrendingList.propTypes = {
    data: PropTypes.array,
};

export default memo(TrendingList);
