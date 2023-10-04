import React from 'react';

import './BlogList.scss';

import BlogItem from '@/components/BlogItem';

import { Grid } from '@mui/material';
import RecommendationTopics from '@/components/RecommendationTopics';
import { Container } from '@mui/system';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';

const BlogList = () => {
    const blog = {
        title: 'Be Kind, Be Kind, Be Kind',
        createdAt: '2023-09-14T16:01:38.875Z',
        content:
            '<p>When you dig a bit deeper, it seems reliably to come from Henry James. Mr. Rogers even attributed it to James when he first said it aloud.<p> <p>The repetition, the clarity, the slight twist of the non-variation where you might expect a variation — all these make it a “sticky” quote, in either the long or the short version. Employing the “rule of three”, like a good joke, the six-word rendition tends to hold like a mantra in the brain. Anyway, that’s how it feels to me. I walk around with it. On my best days it provides a check on my own churlish impulses — those that are too well fed by my childhood obsession with Mad Magazine’s Al Jaffee’s Snappy Answers to Stupid Questions.<p> <h3>In fact, I think about it so much that I may have overthought it. Why the three injunctions, where o<h3> <p>One day it popped into my head that the three might represent, in some sublimated way, the “three ages of man” (which we might prefer now to call the “three ages of the human”). Infancy, decrepitude, and all that comes in-between — life itself, the long middle.<p>',
        likes: 0,
        comments: [],
        image: 'https://miro.medium.com/v2/resize:fit:1400/format:webp/1*dNHoInoCFLxhmRpAudk50g.png',
        id: '65032e829ef5a70c3d083c76',
        author: {
            username: 'secretUser',
            name: 'secretUser',
            id: '64fcc9a2e71d54a05e723105',
            blogs: ['64fccf6f990f3999208f7483', '65032e829ef5a70c3d083c76'],
        },
    };
    return (
        <Container
            maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            className="blog-list__container"
        >
            <Grid container spacing={6}>
                <Grid item xs={12} md={8} className="blog-list__wrapper">
                    <BlogItem blog={blog} />
                    <BlogItem blog={blog} />
                    <BlogItem blog={blog} />
                    <BlogItem blog={blog} />
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
