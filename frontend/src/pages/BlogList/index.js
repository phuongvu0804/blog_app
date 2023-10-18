import React from 'react';
import { useSelector } from 'react-redux';

import './BlogList.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';

import BlogItem from '@/components/BlogItem';
import BlogListSkeleton from './components/BlogListSkeleton';
import RecommendationTopics from '@/components/RecommendationTopics';

import { Alert, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';

const BlogList = () => {
    const blogState = useSelector((state) => state.blogs);
    const noti = useSelector((state) => state.noti);
    const { data, loading } = blogState;

    if (loading) {
        return <BlogListSkeleton />;
    }

    if (!data.length) {
        return (
            <Container
                maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
                className="blog-list__container"
            >
                <Grid container spacing={6}>
                    <Grid item xs={12} md={8} className="blog-list__wrapper">
                        <Typography variant="h4" sx={{ marginTop: 2 }}>
                            There is no currently no blog
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={4}
                        className="blog-list__wrapper hide-on-tablet-mobile"
                    >
                        <RecommendationTopics className="blog-list__topics" />
                    </Grid>
                </Grid>
            </Container>
        );
    }

    return (
        <Container
            maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            className="blog-list__container"
        >
            {noti.content && (
                <Alert severity={noti.type} className="noti">
                    {noti.content}
                </Alert>
            )}
            <Grid container spacing={6}>
                <Grid item xs={12} md={8} className="blog-list__wrapper">
                    {data.map((blog) => (
                        <BlogItem key={blog.id} blog={blog} />
                    ))}
                </Grid>
                <Grid
                    item
                    md={4}
                    className="blog-list__wrapper hide-on-tablet-mobile"
                >
                    <RecommendationTopics className="blog-list__topics" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default BlogList;
