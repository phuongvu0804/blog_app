import React, { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import './BlogSummaryItem.scss';
import blogService from '@/services/blog';
import { setNoti } from '@/reducers/notiReducer';

import Image from '@/components/Image';
import LikeButtonWithHOC from '@/components/buttons/LikeButtonWithHOC';
import CommentButton from '@/components/buttons/CommentButton';
import { CommentButtonSkeleton } from '@/components/buttons/CommentButton';
import Avatar from '@/components/Avatar';
import { LikeButtonSkeleton } from '@/components/buttons/LikeButtonWithHOC';
import SaveButtonWithHOC, {
    SaveButtonSkeleton,
} from '@/components/buttons/SaveButtonWithHOC';

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

const BlogSummaryItem = ({ blogId, userData }) => {
    const dispatch = useDispatch();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        const fetchBlogData = async () => {
            if (blogId) {
                try {
                    const blogData = await blogService.getBlogById(blogId);
                    setBlog(blogData);
                } catch (err) {
                    dispatch(
                        setNoti({
                            type: 'error',
                            content: err.message,
                        }),
                    );
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBlogData();
        return () => {
            controller.abort();
        };
    }, []);

    if (!blog && !loading) {
        return (
            <Grid
                item
                xs={12}
                sm={6}
                md={6}
                className="author-blog__item"
                sx={{
                    minHeight: '12rem',
                }}
            >
                <p>Information about this blog is no longer available</p>
            </Grid>
        );
    }

    if (loading) {
        return <BlogSummaryItemSkeleton />;
    }
    return (
        <Grid item xs={12} sm={6} md={6} className="author-blog__item">
            <Link to={`/blogs/${blogId}`} className="author-blog__img">
                <Image src={blog.image} />
            </Link>
            <Link to={`/users/${userData.id}`} className="author-blog__name">
                <Avatar imageData={userData?.image} />
                <p>{userData.name}</p>
            </Link>
            <Typography
                variant="h4"
                component={Link}
                className="author-blog__title"
            >
                {blog.title}
            </Typography>
            <Typography
                variant="body1"
                component={Link}
                className="author-blog__text"
            >
                {blog.content}
            </Typography>
            <span className="author-blog__date">
                {moment(blog.createdAt).format('ll')}
            </span>
            <div className="author-blog__interaction-list">
                <div className="author-blog__interaction-item">
                    <LikeButtonWithHOC
                        blogId={blog.id}
                        className="blog-details__interaction-item"
                    >
                        {blog.likes ? blog.likes.length : 0}
                    </LikeButtonWithHOC>
                    <CommentButton className="blog-details__interaction-item">
                        {blog.comments?.length}
                    </CommentButton>
                </div>
                <SaveButtonWithHOC
                    className="author-blog__interaction-item"
                    blogId={blog.id}
                />
            </div>
            <Divider
                className="hide-on-tablet-pc"
                sx={{ margin: '3.2rem 0' }}
            />
        </Grid>
    );
};

export default memo(BlogSummaryItem);
