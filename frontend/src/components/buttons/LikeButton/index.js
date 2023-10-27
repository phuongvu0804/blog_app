import React from 'react';
import { useNavigate } from 'react-router-dom';

import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import { Button, Skeleton } from '@mui/material';

import './LikeButton.scss';
import { LOCAL_STORAGE_KEY } from '@/constants/appSettings';

export const LikeButtonSkeleton = ({ className, ...props }) => {
    return (
        <Skeleton
            className={`icon-btn like-btn  ${className ? className : ''}`}
            variant="text"
            sx={{ fontSize: '1.4rem' }}
            width={20}
            {...props}
        />
    );
};

const LikeButton = ({ className, children, ...props }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const user = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!user) {
            navigate('/login');
        }
    };

    return (
        <Button
            className={`icon-btn like-btn ${className}`}
            startIcon={<ThumbUpAltOutlinedIcon />}
            onClick={handleClick}
            {...props}
        >
            {children}
        </Button>
    );
};

export default LikeButton;
