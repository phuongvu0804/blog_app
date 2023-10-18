import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './TrendingItem.scss';

import { Grid, Skeleton } from '@mui/material';
import { Box } from '@mui/system';

import LikeButton from '@/components/buttons/LikeButton';
import DotDivider from '@/components/Divider';
import Image from '@/components/Image';

export const TrendingItemSkeleton = () => {
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
                    <Image
                        className="trending-item__author-img"
                        src={blog.author.image}
                    />
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
export default TrendingItem;
