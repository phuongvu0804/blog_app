import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from 'react-router-dom';

import './RecommendationList.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';

import { Box, Container } from '@mui/system';
import { Grid, IconButton, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import Image from '@/components/Image';
import DotDivider from '@/components/Divider';

const RecommendationItem = ({ blog }) => {
    const [onSaved, setOnSaved] = useState(false);

    return (
        <Grid
            container
            columnSpacing={{ xs: 1, sm: 4, md: 4 }}
            className="rcm-item"
        >
            <Grid item xs={8} sm={8} md={8} className="rcm-item__left">
                <div className="rcm-item__author">
                    <AccountCircleIcon sx={{ fontSize: '2rem' }} />
                    <Typography
                        variant="h6"
                        component={Link}
                        to={`/users/${blog.author.id}`}
                    >
                        {blog.author.name}
                    </Typography>
                </div>
                <Typography
                    variant="h4"
                    component={Link}
                    to={`/blogs/${blog.id}`}
                >
                    {blog.title}
                </Typography>
                <p>{blog.content}</p>
                <Box
                    className="rcm-item__info"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '1.4rem',
                            color: 'var(--gray)',
                        }}
                        className="rcm-item__info-wrapper"
                    >
                        <span className="rcm-item__date">
                            {moment(blog.createdAt).format('ll')}
                        </span>
                        <DotDivider />
                        <span className="rcm-item__like">
                            <ThumbUpIcon
                                sx={{
                                    fill: 'var(--blue)',
                                    marginRight: '0.4rem',
                                }}
                            />
                            {blog.likes}
                        </span>
                    </Box>
                    <IconButton
                        className={`rcm-item__info-btn ${
                            onSaved ? 'on-saved' : ''
                        }`}
                        onClick={() => setOnSaved(!onSaved)}
                    >
                        {onSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                    </IconButton>
                </Box>
            </Grid>
            <Grid item xs={4} sm={4} md={4} className="rcm-item__right">
                <Link to={`/blogs/${blog.id}`}>
                    <Image src={blog?.image} />
                </Link>
            </Grid>
        </Grid>
    );
};

const RecommendationList = ({ blogList, recommendationTopics, footerList }) => {
    return (
        <Container
            maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            className="rcm-list__container"
        >
            <Grid container spacing={12} className="rcm-list__grid-container">
                <Grid item xs={12} md={7} className="rcm-list__wrapper">
                    {blogList.map((blog) => (
                        <RecommendationItem key={blog.id} blog={blog} />
                    ))}
                </Grid>
                <Grid item xs={12} md={5} className="rcm-list__wrapper">
                    <div className="rcm-topics">
                        <Typography
                            variant="h6"
                            sx={{ fontSize: '1.6rem', paddingBottom: '1.6rem' }}
                        >
                            Discover more of what matters to you
                        </Typography>
                        <Box
                            sx={{ display: 'flex', flexWrap: 'wrap' }}
                            container
                            spacing={1}
                            className="rcm-list__topic-list"
                        >
                            {recommendationTopics.map((item, index) => (
                                <div key={index}>
                                    <Link className="rcm-list__topic-item">
                                        {item}
                                    </Link>
                                </div>
                            ))}
                        </Box>
                        <Link variant="text" className="rcm-list__topic-btn">
                            See more topics
                        </Link>
                    </div>
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
