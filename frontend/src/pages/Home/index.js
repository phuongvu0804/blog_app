import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import './Home.scss';
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

    const blogs = useSelector((state) => state.blogs.data);
    const [trendingBlogs, setTrendingBlogs] = useState([]);

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
            <Banner />
            <TrendingList data={trendingBlogs} />
            <RecommendationList blogList={blogs} footerList={footerList} />
        </div>
    );
};

export default Home;
