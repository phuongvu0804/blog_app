import React from 'react';
import { Link } from 'react-router-dom';

import './NotFound.scss';
import images from '@/assets/images';

import { Box, Container } from '@mui/system';

import Logo from '@/components/Logo';
import Image from '@/components/Image';

const NotFound = () => {
    return (
        <div className="not-found">
            <header>
                <Container maxWidth="md">
                    <Logo className="not-found__logo" />
                </Container>
            </header>
            <Box sx={{ height: '6.5rem' }}></Box>
            <Container maxWidth="md" className="not-found__wrapper">
                <div className="not-found__left hide-on-mobile">
                    <Image src={images.notFoundImg} />
                </div>
                <div className="not-found__right">
                    <p className="not-found__title">PAGE NOT FOUND</p>
                    <div className="not-found__main">
                        <p>404</p>
                        <p>Out of nothing, something.</p>
                    </div>
                    <div className="hide-on-tablet-pc">
                        <Image
                            style={{
                                width: '30.3rem',
                                height: '30.3rem',
                                margin: '2rem 0',
                            }}
                            src={images.notFoundImg}
                        />
                    </div>
                    <p className="not-found__text">
                        You can find (just about) anything on Medium —
                        apparently even a page that doesn’t exist. Maybe these
                        stories about finding what you didn’t know you were
                        looking for will take you somewhere new?
                    </p>
                    <Link to="/" className="not-found__link">
                        Home
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default NotFound;
