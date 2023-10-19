import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './BlogSummaryItem.scss';

import Image from '@/components/Image';
import SaveButton from '@/components/buttons/SaveButton';
import LikeButton from '@/components/buttons/LikeButton';
import CommentButton from '@/components/buttons/CommentButton';
import { LikeButtonSkeleton } from '@/components/buttons/LikeButton';
import { CommentButtonSkeleton } from '@/components/buttons/CommentButton';
import { SaveButtonSkeleton } from '@/components/buttons/SaveButton';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Divider, Grid, Skeleton, Typography } from '@mui/material';

export const BlogSummaryItemSkeleton = () => {
    return (
        <Grid item xs={12} sm={6} md={6} className="author-blog__item">
            <Skeleton
                className="author-blog__img"
                variant="rounded"
                width={'100%'}
                height={210}
            />

            <Skeleton
                className="author-blog__name"
                variant="text"
                sx={{ fontSize: '1.6rem' }}
                width={100}
            />

            <Skeleton
                className="author-blog__title"
                variant="text"
                sx={{ fontSize: '2rem' }}
                width={210}
            />

            <Skeleton
                className="author-blog__text"
                variant="text"
                sx={{ fontSize: '1.6rem' }}
                width={'100%'}
                height={50}
            />

            <Skeleton
                className="author-blog__date"
                variant="text"
                sx={{ fontSize: '1.4rem' }}
                width={'50'}
            />
            <div className="author-blog__interaction-list">
                <div className="author-blog__interaction-item">
                    <LikeButtonSkeleton
                        component="button"
                        className="blog-details__interaction-item"
                    />
                    <CommentButtonSkeleton
                        component="button"
                        className="blog-details__interaction-item"
                    />
                </div>
                <SaveButtonSkeleton className="author-blog__interaction-item" />
            </div>
            <Divider
                className="hide-on-tablet-pc"
                sx={{ margin: '3.2rem 0' }}
            />
        </Grid>
    );
};

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
                <SaveButton
                    className="author-blog__interaction-item"
                    blogId={blogData.id}
                />
            </div>
            <Divider
                className="hide-on-tablet-pc"
                sx={{ margin: '3.2rem 0' }}
            />
        </Grid>
    );
};

export default BlogSummaryItem;
