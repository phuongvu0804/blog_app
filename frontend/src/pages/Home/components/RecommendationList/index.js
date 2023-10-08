import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './RecommendationList.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';

import { Container } from '@mui/system';
import { Grid } from '@mui/material';

import RecommendationTopics from '@/components/RecommendationTopics';
import BlogItem from '@/components/BlogItem';
import TextButton from '@/components/buttons/TextButton';

const RecommendationList = ({ blogList, footerList }) => {
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
                    <div className="footer">
                        {footerList.map((item, index) => (
                            <Link className="footer-item" key={index}>
                                {item}
                            </Link>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

RecommendationList.propTypes = {
    data: PropTypes.array,
};

export default RecommendationList;
