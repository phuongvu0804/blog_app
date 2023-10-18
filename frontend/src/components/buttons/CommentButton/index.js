import React from 'react';

import './CommentButton.scss';

import { Button, Skeleton } from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

export const CommentButtonSkeleton = ({ className, ...props }) => {
    return (
        <Skeleton
            className={`icon-btn comment-btn ${className ? className : ''}`}
            variant="text"
            sx={{ fontSize: '1.4rem' }}
            width={20}
            {...props}
        />
    );
};

const CommentButton = ({ className, children, ...props }) => {
    return (
        <Button
            className={`icon-btn comment-btn ${className}`}
            startIcon={<ChatBubbleOutlineOutlinedIcon />}
            {...props}
        >
            {children}
        </Button>
    );
};

export default CommentButton;
