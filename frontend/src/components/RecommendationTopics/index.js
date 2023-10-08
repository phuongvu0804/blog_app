import React from 'react';
import { Link } from 'react-router-dom';

import './RecommendationTopics.scss';

import { Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';

import TextButton from '@/components/buttons/TextButton';

const recommendationTopics = [
    'Programming',
    'Data Science',
    'Technology',
    'Self Improvement',
    'Writing',
    'Relationships',
    'Machine Learning',
    'Productivity',
    'Politics',
];

export const RecommendationTopicsSkeleton = ({ className }) => {
    return (
        <div className={`rcm-topics ${className}`}>
            <Skeleton variant="text" sx={{ fontSize: '1.6rem' }} width={335} />

            <Box
                sx={{ display: 'flex', flexWrap: 'wrap' }}
                container
                spacing={1}
                className="rcm-list__topic-list"
            >
                {recommendationTopics.map((item, index) => (
                    <div key={index}>
                        <Skeleton
                            variant="text"
                            className="rcm-list__topic-item"
                            sx={{ fontSize: '1.4rem' }}
                            width={79}
                            height={38}
                        />
                    </div>
                ))}
            </Box>
            <Skeleton variant="text" sx={{ fontSize: '1.4rem' }} width={100} />
        </div>
    );
};

const RecommendationTopics = ({ className }) => {
    return (
        <div className={`rcm-topics ${className}`}>
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
                        <Link className="rcm-list__topic-item">{item}</Link>
                    </div>
                ))}
            </Box>
            <TextButton>See more topics</TextButton>
        </div>
    );
};

export default RecommendationTopics;
