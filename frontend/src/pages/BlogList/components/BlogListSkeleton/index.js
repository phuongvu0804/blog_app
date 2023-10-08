import React from 'react';

import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';

import { BlogItemSkeleton } from '@/components/BlogItem';

import { Container, Grid } from '@mui/material';
import { RecommendationTopicsSkeleton } from '@/components/RecommendationTopics';

const BlogListSkeleton = () => {
    return (
        <Container
            maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            className="blog-list__container"
        >
            <Grid container spacing={6}>
                <Grid item xs={12} md={8} className="blog-list__wrapper">
                    {Array.apply(null, Array(6)).map((item, index) => (
                        <BlogItemSkeleton key={index} />
                    ))}
                </Grid>
                <Grid
                    item
                    md={4}
                    className="blog-list__wrapper hide-on-tablet-mobile"
                >
                    <RecommendationTopicsSkeleton />
                </Grid>
            </Grid>
        </Container>
    );
};

export default BlogListSkeleton;
