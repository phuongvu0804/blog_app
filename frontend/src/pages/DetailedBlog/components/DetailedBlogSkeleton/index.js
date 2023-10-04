import React from 'react';

import SaveButton from '@/components/SaveButton';
import { MAX_WIDTH_BLOG_DETAILS } from '@/constants';

import Skeleton from '@mui/material/Skeleton';
import { Button, Container, Divider, Grid, IconButton } from '@mui/material';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const BlogSummaryItemSkeleton = () => {
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
                    <Button
                        className="blog-details__interaction-item"
                        startIcon={<ThumbUpAltOutlinedIcon />}
                    >
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: '1.4rem' }}
                            width={20}
                        />
                    </Button>
                    <Button
                        className="blog-details__interaction-item"
                        startIcon={<ChatBubbleOutlineOutlinedIcon />}
                    >
                        <Skeleton
                            variant="text"
                            sx={{ fontSize: '1.4rem' }}
                            width={20}
                        />
                    </Button>
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

const DetailedBlogSkeleton = () => {
    return (
        <div className="blog-details__container">
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
                        <Button
                            className="blog-details__interaction-item"
                            startIcon={<ThumbUpAltOutlinedIcon />}
                        >
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.4rem' }}
                                width={20}
                            />
                        </Button>
                        <Button
                            className="blog-details__interaction-item"
                            startIcon={<ChatBubbleOutlineOutlinedIcon />}
                        >
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: '1.4rem' }}
                                width={20}
                            />
                        </Button>
                    </div>
                    <div className="blog-details__interaction-right">
                        <SaveButton />
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
                            <Button
                                className="blog-details__interaction-item"
                                startIcon={<ThumbUpAltOutlinedIcon />}
                            >
                                <Skeleton
                                    variant="text"
                                    sx={{ fontSize: '1.4rem' }}
                                    width={20}
                                />
                            </Button>
                            <Button
                                className="blog-details__interaction-item"
                                startIcon={<ChatBubbleOutlineOutlinedIcon />}
                            >
                                <Skeleton
                                    variant="text"
                                    sx={{ fontSize: '1.4rem' }}
                                    width={20}
                                />
                            </Button>
                        </div>
                        <div className="blog-details__interaction-right">
                            <IconButton>
                                <BookmarkBorderIcon />
                            </IconButton>
                        </div>
                    </div>
                </Container>
            </Container>
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
                        <Grid
                            container
                            spacing={2}
                            className="author-blog__list"
                        >
                            {Array.apply(null, Array(4)).map((item, index) => (
                                <BlogSummaryItemSkeleton key={index} />
                            ))}
                        </Grid>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default DetailedBlogSkeleton;
