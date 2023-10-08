import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './UserDetails.scss';

import Image from '@/components/Image';
import SaveButton from '@/components/buttons/SaveButton';
import LikeButton from '@/components/buttons/LikeButton';
import CommentButton from '@/components/buttons/CommentButton';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button, Divider, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { MAX_WIDTH_BLOG_DETAILS } from '@/constants';

const BlogSummaryItem = ({ blogData, authorName, authorId }) => {
    return (
        <Grid item xs={12} sm={6} md={6} className="author-blog__item">
            <Link to={`/blogs/${blogData.id}`} className="author-blog__img">
                <Image src={blogData.image} />
            </Link>
            <Link to={`/users/${authorId}`} className="author-blog__name">
                <AccountCircleIcon />
                <p>{authorName}</p>
            </Link>
            <Typography
                variant="h4"
                component={Link}
                className="author-blog__title"
            >
                {blogData.title}
            </Typography>
            <Typography
                variant="body1"
                component={Link}
                className="author-blog__text"
            >
                {blogData.content}
            </Typography>
            <span className="author-blog__date">
                {moment(blogData.createdAt).format('ll')}
            </span>
            <div className="author-blog__interaction-list">
                <div className="author-blog__interaction-item">
                    <LikeButton className="blog-details__interaction-item">
                        {blogData.likes}
                    </LikeButton>
                    <CommentButton className="blog-details__interaction-item">
                        {blogData.comments.length}
                    </CommentButton>
                </div>
                <SaveButton className="author-blog__interaction-item" />
            </div>
            <Divider
                className="hide-on-tablet-pc"
                sx={{ margin: '3.2rem 0' }}
            />
        </Grid>
    );
};

const UserDetails = () => {
    const authorDetails = useSelector((state) => state.user);
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(authorDetails);
    }, [authorDetails]);

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
