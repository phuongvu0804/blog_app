import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';

import { Box, Container } from '@mui/system';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { Grid, Skeleton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import './TrendingList.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';
import { NUMBER_OF_TRENDING_BLOGS } from '@/constants';

import DotDivider from '@/components/Divider';
import LikeButton from '@/components/buttons/LikeButton';

const TrendingItemSkeleton = () => {
    return (
        <Grid item xs={12} sm={6} md={4} className="trending-list__item">
            <div className="trending-item__no">
                <Skeleton component="span" variant="rounded" />
            </div>
            <div className="trending-item__wrapper">
                <Link className="trending-item__author">
                    <Skeleton
                        component="svg"
                        variant="circular"
                        className="trending-item__author-icon"
                        width={20}
                        height={20}
                    />

                    <Skeleton
                        component="span"
                        variant="text"
                        className="trending-item__author-name"
                        width={68}
                    />
                </Link>

                <Skeleton
                    component="a"
                    variant="text"
                    className="trending-item__title"
                    width={170}
                />
                <Skeleton
                    component="div"
                    variant="rounded"
                    width={170}
                    height={20}
                />
            </div>
        </Grid>
    );
};

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

const TrendingItem = ({ blog, index }) => {
    return (
        <Grid item xs={12} sm={6} md={4} className="trending-list__item">
            <div className="trending-item__no">
                <span>{index < 10 ? `0${index + 1}` : index + 1}</span>
            </div>
            <div className="trending-item__wrapper">
                <Link
                    to={`/users/${blog.author.id}`}
                    className="trending-item__author"
                >
                    <PersonIcon className="trending-item__author-icon" />
                    <span className="trending-item__author-name">
                        {blog.author.name}
                    </span>
                </Link>
                <Link to={`/blogs/${blog.id}`} className="trending-item__title">
                    {blog.title}
                </Link>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <p className="trending-item__date">
                        {moment(blog.createdAt).format('ll')}
                    </p>
                    <DotDivider />
                    <LikeButton className="trending-item__like">
                        {blog.likes}
                    </LikeButton>
                </Box>
            </div>
        </Grid>
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

TrendingItem.propTypes = {
    blog: PropTypes.object,
    index: PropTypes.number,
};

export default TrendingList;
