import React from 'react';
import { useSelector } from 'react-redux';

import './Home.scss';
import { NUMBER_OF_TRENDING_BLOGS } from '@/constants/appSettings';

import RecommendationList from './components/RecommendationList';
import Banner from './components/Banner';
import TrendingList from './components/TrendingList';
import HomeSkeleton from './components/HomeSkeleton';

import { Alert } from '@mui/material';

const Home = () => {
    const { data, loading } = useSelector((state) => state.blogs);
    const noti = useSelector((state) => state.noti);

    const trendingBlogs = data.slice(0, NUMBER_OF_TRENDING_BLOGS);

    if (loading) {
        return <HomeSkeleton />;
    }

    return (
        <div>
            {noti.content && (
                <Alert severity={noti.type} className="noti">
                    {noti.content}
                </Alert>
            )}
            <Banner />
            <TrendingList data={trendingBlogs} />
            <RecommendationList blogList={data} />
        </div>
    );
};

export default Home;
