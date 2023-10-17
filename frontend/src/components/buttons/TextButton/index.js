import { Skeleton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import './TextButton.scss';

export const TextButtonSkeleton = ({ className }) => {
    return (
        <Skeleton
            component="a"
            variant="text"
            className={`text-btn ${className ? className : ''}`}
        />
    );
};

const TextButton = ({ children, to, className }) => {
    return (
        <Link
            variant="text"
            to={to}
            className={`text-btn ${className ? className : ''}`}
        >
            {children}
        </Link>
    );
};

export default TextButton;
