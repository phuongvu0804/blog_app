import React from 'react';
import { Link } from 'react-router-dom';

import './RecommendationTopics.scss';

import { Typography } from '@mui/material';
import { Box } from '@mui/system';

const RecommendationTopics = ({ className }) => {
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
            <Link variant="text" className="rcm-list__topic-btn">
                See more topics
            </Link>
        </div>
    );
};

export default RecommendationTopics;
