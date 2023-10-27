import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './UserDetails.scss';
import { MAX_WIDTH_BLOG_DETAILS } from '@/constants/appSettings';
import Avatar from '@/components/Avatar';

import { Button, Grid, Skeleton } from '@mui/material';
import { Container } from '@mui/system';

import { BlogSummaryItemSkeleton } from '../BlogSummaryItem';
import BlogSummaryItem from '../BlogSummaryItem';

export const UserDetailsSkeleton = () => {
    return (
        <div className="blog-details__author-wrapper">
            <Container maxWidth={MAX_WIDTH_BLOG_DETAILS}>
                <Skeleton
                    className="blog-details__author-details"
                    variant="text"
                    sx={{ fontSize: '2.4rem' }}
                    width={250}
                />

                <div className="blog-details__author-blog-list">
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.6rem' }}
                        width={200}
                    />
                    <Grid container spacing={2} className="author-blog__list">
                        {Array.apply(null, Array(4)).map((item, index) => (
                            <BlogSummaryItemSkeleton key={index} />
                        ))}
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

const UserDetails = ({ authorData }) => {
    return (
        <div className="blog-details__author-wrapper">
            <Container maxWidth={MAX_WIDTH_BLOG_DETAILS}>
                <div className="blog-details__author-details">
                    <Avatar
                        imageData={authorData?.image}
                        alt={authorData.name}
                    />
                    <h4>Written by {authorData.name}</h4>
                </div>
                <div className="blog-details__author-blog-list">
                    <h3>More from {authorData.name}</h3>
                    <Grid container spacing={2} className="author-blog__list">
                        {authorData.blogs.map((blog, index) => (
                            <BlogSummaryItem
                                key={index}
                                blogId={blog}
                                userData={authorData}
                            />
                        ))}
                    </Grid>
                </div>

                <Button
                    component={Link}
                    to={'/users/:id'}
                    variant="outlined"
                    className="hide-on-tablet-pc blog-details__more-btn"
                >
                    See all from {authorData.name}
                </Button>
            </Container>
        </div>
    );
};

export default memo(UserDetails);
