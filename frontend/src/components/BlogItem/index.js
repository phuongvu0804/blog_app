import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './BlogItem.scss';

import { Box } from '@mui/system';
import { Grid, Skeleton, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Image from '@/components/Image';
import DotDivider from '@/components/Divider';
import LikeButton from '@/components/buttons/LikeButton';
import SaveButton from '@/components/buttons/SaveButton';
import { LikeButtonSkeleton } from '@/components/buttons/LikeButton';
import { SaveButtonSkeleton } from '@/components/buttons/SaveButton';

export const BlogItemSkeleton = () => {
    return (
        <Grid
            container
            columnSpacing={{ xs: 1, sm: 4, md: 4 }}
            className="blog-item"
        >
            <Grid item xs={8} sm={8} md={8} className="blog-item__left">
                <div className="blog-item__author">
                    <Skeleton variant="circular" width={20} height={20} />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.4rem' }}
                        width={70}
                    />
                </div>

                <Skeleton
                    variant="text"
                    sx={{ fontSize: '20rem' }}
                    width={200}
                />
                <Skeleton variant="rounded" width="100%" height={60} />
                <Box
                    className="blog-item__info"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '1.4rem',
                            color: 'var(--gray)',
                        }}
                        className="blog-item__info-wrapper"
                    >
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: '1.4rem' }}
                            width={80}
                        />
                        <DotDivider />
                        <LikeButtonSkeleton />
                    </Box>
                    <SaveButtonSkeleton />
                </Box>
            </Grid>
            <Grid item xs={4} sm={4} md={4} className="blog-item__right">
                <Skeleton variant="rectangular" width={200} height={134} />
            </Grid>
        </Grid>
    );
};

const BlogItem = ({ blog }) => {
    return (
        <Grid
            container
            columnSpacing={{ xs: 1, sm: 4, md: 4 }}
            className="blog-item"
        >
            <Grid item xs={8} sm={8} md={8} className="blog-item__left">
                <div className="blog-item__author">
                    <AccountCircleIcon sx={{ fontSize: '2rem' }} />
                    <Typography
                        variant="h6"
                        component={Link}
                        to={`/users/${blog.author.id}`}
                    >
                        {blog.author.name}
                    </Typography>
                </div>
                <Typography
                    variant="h4"
                    component={Link}
                    to={`/blogs/${blog.id}`}
                >
                    {blog.title}
                </Typography>
                <p>{blog.content}</p>
                <Box
                    className="blog-item__info"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '1.4rem',
                            color: 'var(--gray)',
                        }}
                        className="blog-item__info-wrapper"
                    >
                        <span className="blog-item__date">
                            {moment(blog.createdAt).format('ll')}
                        </span>
                        <DotDivider />
                        <LikeButton className="blog-item__like">
                            {blog.likes}
                        </LikeButton>
                    </Box>
                    <SaveButton />
                </Box>
            </Grid>
            <Grid item xs={4} sm={4} md={4} className="blog-item__right">
                <Link to={`/blogs/${blog.id}`}>
                    <Image src={blog?.image} />
                </Link>
            </Grid>
        </Grid>
    );
};

export default BlogItem;
