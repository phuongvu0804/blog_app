import { Skeleton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.scss';

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

export const FooterSkeleton = ({ className }) => {
    return (
        <div className={`footer ${className ? className : ''}`}>
            {Array.apply(null, Array(footerList.length)).map((item, index) => (
                <Skeleton
                    key={index}
                    variant="text"
                    className="footer-item"
                    sx={{ fontSize: '1.1rem' }}
                    width={20}
                />
            ))}
        </div>
    );
};

const Footer = ({ className }) => {
    return (
        <div className={`footer ${className ? className : ''}`}>
            {footerList.map((item, index) => (
                <Link className="footer-item" key={index}>
                    {item}
                </Link>
            ))}
        </div>
    );
};

export default Footer;
