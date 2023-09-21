import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Box, Container } from '@mui/system';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import './TrendingList.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';
import { Grid } from '@mui/material';
import moment from 'moment';

const TrendingItem = ({ blog, index }) => {
    return (
        <Grid item xs={12} sm={6} md={4} className="trending-list__item">
            <div className="trending-item__no">
                <span>{index < 10 ? `0${index + 1}` : index + 1}</span>
            </div>
            <div className="trending-item__wrapper">
                <Link
                    to={`/users/${blog.author.id}`}
                    className="trending-item__author"
                >
                    <PersonIcon className="trending-item__author-icon" />
                    <span className="trending-item__author-name">
                        {blog.author.name}
                    </span>
                </Link>
                <Link className="trending-item__title">{blog.title}</Link>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <p className="trending-item__date">
                        {moment(blog.createdAt).format('ll')}
                    </p>
                    <FiberManualRecordIcon
                        sx={{
                            fontSize: '0.3rem',
                            margin: '0 0.6rem',
                            fill: 'var(--gray)',
                        }}
                    />
                    <p className="trending-item__like">
                        <ThumbUpIcon
                            sx={{ fill: '#437aff', marginRight: '0.4rem' }}
                        />
                        {blog.likes}
                    </p>
                </Box>
            </div>
        </Grid>
    );
};

const TrendingList = ({ data }) => {
    return (
        <Container
            maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            className="trending-list__container"
        >
            <h2 className="sub-title-md">
                <TrendingUpIcon />
                Trending on Medium
            </h2>
            <Grid container spacing={2} className="trending-list__wrapper">
                {data.map((blog, index) => (
                    <TrendingItem key={blog.id} blog={blog} index={index} />
                ))}
            </Grid>
        </Container>
    );
};

TrendingList.propTypes = {
    data: PropTypes.array,
};

TrendingItem.propTypes = {
    blog: PropTypes.object,
    index: PropTypes.number,
};

export default TrendingList;
