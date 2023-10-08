import React from 'react';
import { Link } from 'react-router-dom';

import './TextButton.scss';

const TextButton = ({ children, to, className }) => {
    return (
        <Link variant="text" to={to} className={`text-btn ${className}`}>
            {children}
        </Link>
    );
};

export default TextButton;
