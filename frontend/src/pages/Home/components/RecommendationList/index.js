import React, { memo } from 'react';
import PropTypes from 'prop-types';

import './RecommendationList.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants/appSettings';

import { Container } from '@mui/system';
import { Grid } from '@mui/material';

import RecommendationTopics from '@/components/RecommendationTopics';
import BlogItem from '@/components/BlogItem';
import TextButton from '@/components/buttons/TextButton';
import Footer from '@/components/Footer';
import { FooterSkeleton } from '@/components/Footer';
import { RecommendationTopicsSkeleton } from '@/components/RecommendationTopics';
import { TextButtonSkeleton } from '@/components/buttons/TextButton';
import { BlogItemSkeleton } from '@/components/BlogItem';

export const RecommendationListSkeleton = () => {
    return (
        <Container
            maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            className="rcm-list__container"
        >
            <Grid container spacing={12} className="rcm-list__grid-container">
                <Grid item xs={12} md={7} className="rcm-list__wrapper">
                    {Array.apply(null, Array(8)).map((blog, index) => (
                        <BlogItemSkeleton key={index} />
                    ))}

                    <TextButtonSkeleton className="rcm-list__btn" />
                </Grid>
                <Grid item xs={12} md={5} className="rcm-list__wrapper">
                    <RecommendationTopicsSkeleton />
                    <FooterSkeleton />
                </Grid>
            </Grid>
        </Container>
    );
};

const RecommendationList = ({ blogList }) => {
    if (!blogList) {
        return (
            <Container
                maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
                className="rcm-list__container"
            >
                <p>There is currently no blog available</p>
            </Container>
        );
    }
    return (
        <Container
            maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            className="rcm-list__container"
        >
            <Grid container spacing={12} className="rcm-list__grid-container">
                <Grid item xs={12} md={7} className="rcm-list__wrapper">
                    {blogList.map((blog) => (
                        <BlogItem key={blog.id} blog={blog} />
                    ))}

                    <TextButton to={'/blogs'} className="rcm-list__btn">
                        See more blogs
                    </TextButton>
                </Grid>
                <Grid item xs={12} md={5} className="rcm-list__wrapper">
                    <RecommendationTopics />
                    <Footer />
                </Grid>
            </Grid>
        </Container>
    );
};

RecommendationList.propTypes = {
    data: PropTypes.array,
};

export default memo(RecommendationList);
