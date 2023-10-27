import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './Blog.scss';
import { MAX_WIDTH_BLOG_DETAILS } from '@/constants/appSettings';

import Image from '@/components/Image';
import SaveButton from '@/components/buttons/SaveButton';
import LikeButton from '@/components/buttons/LikeButton';
import CommentButton from '@/components/buttons/CommentButton';
import { LikeButtonSkeleton } from '@/components/buttons/LikeButton';
import { CommentButtonSkeleton } from '@/components/buttons/CommentButton';
import { SaveButtonSkeleton } from '@/components/buttons/SaveButton';
import Avatar from '@/components/Avatar';

import { IconButton, Skeleton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Container } from '@mui/system';

export const BlogSkeleton = () => {
    return (
        <Container
            maxWidth={MAX_WIDTH_BLOG_DETAILS}
            className="blog-details__wrapper"
        >
            <Skeleton
                variant="text"
                className="blog-details__title"
                width={300}
            />
            <div className="blog-details__author">
                <div className="blog-details__author-img">
                    <Skeleton variant="circular" width={40} height={40} />
                </div>
                <div className="blog-details__author-info">
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.6rem' }}
                        width={200}
                    />
                    <Skeleton
                        variant="text"
                        sx={{ fontSize: '1.4rem' }}
                        width={100}
                    />
                </div>
            </div>
            <div className="blog-details__interaction">
                <div className="blog-details__interaction-left">
                    <LikeButtonSkeleton
                        component="button"
                        className="blog-details__interaction-item"
                        sx={{ border: 'none' }}
                    />
                    <CommentButtonSkeleton
                        component="button"
                        className="blog-details__interaction-item"
                        sx={{ border: 'none' }}
                    />
                </div>
                <div className="blog-details__interaction-right">
                    <SaveButtonSkeleton />
                </div>
            </div>
            <Container
                maxWidth={MAX_WIDTH_BLOG_DETAILS}
                className="blog-details__content"
            >
                <Skeleton variant="rounded" width={'100%'} height={300} />
                <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginTop: '4rem' }}
                />
                {Array.apply(null, Array(10)).map((item, index) => (
                    <Skeleton
                        key={index}
                        variant="text"
                        sx={{ fontSize: '2rem' }}
                    />
                ))}
                <div className="blog-details__interaction">
                    <div className="blog-details__interaction-left">
                        <LikeButtonSkeleton
                            component="button"
                            className="blog-details__interaction-item"
                            sx={{ border: 'none' }}
                        />
                        <CommentButtonSkeleton
                            component="button"
                            className="blog-details__interaction-item"
                            sx={{ border: 'none' }}
                        />
                    </div>
                    <div className="blog-details__interaction-right">
                        <SaveButtonSkeleton />
                    </div>
                </div>
            </Container>
        </Container>
    );
};

const Blog = ({ blogData }) => {
    const [onSaved, setOnSaved] = useState(false);
    return (
        <Container
            maxWidth={MAX_WIDTH_BLOG_DETAILS}
            className="blog-details__wrapper"
        >
            <h1 className="blog-details__title">{blogData.title}</h1>
            <div className="blog-details__author">
                <div className="blog-details__author-img">
                    <Avatar
                        imageData={blogData.author?.image}
                        alt={blogData.author?.name}
                    />
                </div>
                <div className="blog-details__author-info">
                    <h6>{blogData.author?.name}</h6>
                    <p>{moment(blogData.createdAt).format('ll')}</p>
                </div>
            </div>
            <div className="blog-details__interaction">
                <div className="blog-details__interaction-left">
                    <LikeButton className="blog-details__interaction-item">
                        {blogData.likes}
                    </LikeButton>
                    <CommentButton className="blog-details__interaction-item">
                        {blogData.comments.length}
                    </CommentButton>
                </div>
                <div className="blog-details__interaction-right">
                    <SaveButton blogId={blogData.id} />
                </div>
            </div>
            <Container
                maxWidth={MAX_WIDTH_BLOG_DETAILS}
                className="blog-details__content"
            >
                <Image src={blogData.image} className="blog-details__img" />
                <p>{blogData.content}</p>
                <div className="blog-details__interaction">
                    <div className="blog-details__interaction-left">
                        <LikeButton className="blog-details__interaction-item">
                            {blogData.likes}
                        </LikeButton>
                        <CommentButton className="blog-details__interaction-item">
                            {blogData.comments.length}
                        </CommentButton>
                    </div>
                    <div className="blog-details__interaction-right">
                        <IconButton onClick={() => setOnSaved(!onSaved)}>
                            {onSaved ? (
                                <BookmarkIcon />
                            ) : (
                                <BookmarkBorderIcon />
                            )}
                        </IconButton>
                    </div>
                </div>
            </Container>
        </Container>
    );
};

Blog.propTypes = {
    blogData: PropTypes.object,
};

export default Blog;
