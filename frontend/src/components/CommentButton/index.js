import React from 'react';

import './CommentButton.scss';

import { Button } from '@mui/material';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const CommentButton = ({ className, children }) => {
    return (
        <Button
            className={`icon-btn comment-btn ${className}`}
            startIcon={<ChatBubbleOutlineOutlinedIcon />}
        >
            {children}
        </Button>
    );
};

export default CommentButton;
