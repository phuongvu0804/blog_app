import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './Blog.scss';
import { MAX_WIDTH_BLOG_DETAILS } from '@/constants';

import Image from '@/components/Image';
import SaveButton from '@/components/SaveButton';
import LikeButton from '@/components/LikeButton';
import CommentButton from '@/components/CommentButton';

import { IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Container } from '@mui/system';

const Blog = ({ blogData }) => {
    const [onSaved, setOnSaved] = useState(false);

    // if (!blogData) {
    //     return <p>no blog</p>;
    // }

    return (
        <Container
            maxWidth={MAX_WIDTH_BLOG_DETAILS}
            className="blog-details__wrapper"
        >
            <h1 className="blog-details__title">{blogData.title}</h1>
            <div className="blog-details__author">
                <div className="blog-details__author-img">
                    <AccountCircleIcon />
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
