import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './UserDetails.scss';
import { setNoti } from '@/reducers/notiReducer';
import { MAX_WIDTH_BLOG_DETAILS } from '@/constants';
import userService from '@/services/user';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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

const UserDetails = ({ authorId }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await userService.getUserById(authorId);
                setUser(userDetails);
            } catch (err) {
                setNoti({
                    type: 'error',
                    content: err.message,
                });
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div className="blog-details__author-wrapper">
            <Container maxWidth={MAX_WIDTH_BLOG_DETAILS}>
                <div className="blog-details__author-details">
                    <AccountCircleIcon />
                    <h4>Written by {user?.name}</h4>
                </div>
                <div className="blog-details__author-blog-list">
                    <h3>More from {user?.name}</h3>
                    <Grid container spacing={2} className="author-blog__list">
                        {user?.blogs.map((blog) => (
                            <BlogSummaryItem
                                key={blog.id}
                                blogData={blog}
                                authorName={user?.name}
                                authorId={user?.id}
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
                    See all from {user?.name}
                </Button>
            </Container>
        </div>
    );
};

export default UserDetails;
