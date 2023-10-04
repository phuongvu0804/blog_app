import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box } from '@mui/material';

import { HEADER_HEIGHT_DEFAULT_LAYOUT } from '@/constants';
import './Home.scss';
import { initializeBlogs } from '@/reducers/blogReducer';
import RecommendationList from './components/RecommendationList';

import Banner from './components/Banner';
import TrendingList from './components/TrendingList';

const Home = () => {
    const footerList = [
        'Help',
        'Status',
        'Writer',
        'Blog',
        'Careers',
        'Privacy',
        'Terms',
        'About',
        'Text to speech',
        'Terms',
    ];

    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs);
    const [trendingBlogs, setTrendingBlogs] = useState([]);

    useEffect(() => {
        dispatch(initializeBlogs());
    }, []);

    const filterBlogsByLikes = () => {
        const newBlogs = [...blogs]
            .sort((a, b) => {
                if (a.likes > b.likes) {
                    return -1;
                } else if (a.likes < b.likes) {
                    return 1;
                } else {
                    return 0;
                }
            })
            .slice(0, 6);

        setTrendingBlogs(newBlogs);
    };

    useEffect(() => {
        filterBlogsByLikes();
    }, [blogs]);

    return (
        <div>
            <Box sx={{ height: HEADER_HEIGHT_DEFAULT_LAYOUT }} />
            <Banner />
            <TrendingList data={trendingBlogs} />
            <RecommendationList blogList={blogs} footerList={footerList} />
        </div>
    );
};

export default Home;
