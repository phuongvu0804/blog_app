import React from 'react';

import { BannerSkeleton } from '../Banner';
import { RecommendationListSkeleton } from '../RecommendationList';
import { TrendingListSkeleton } from '../TrendingList';

import './HomeSkeleton.scss';
const HomeSkeleton = () => {
    return (
        <div>
            <BannerSkeleton />
            <TrendingListSkeleton />
            <RecommendationListSkeleton />
        </div>
    );
};

export default HomeSkeleton;
