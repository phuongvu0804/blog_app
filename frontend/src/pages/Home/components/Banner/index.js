import React from 'react';
import { Container } from '@mui/system';

import './Banner.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';
import images from '@/assets/images';

import MainButton from '@/components/buttons/MainButton';
import Image from '@/components/Image';
const Banner = () => {
    return (
        <div className="banner__wrapper">
            <Container
                className="banner__container"
                maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            >
                <div className="banner__content">
                    <h2>Stay curios.</h2>
                    <p>
                        Discover stories, thinking, and expertise from writers
                        on any topic.
                    </p>
                    <MainButton>Start Reading</MainButton>
                </div>
                <div className="banner__img">
                    <Image src={images.bannerHomePage} />
                </div>
            </Container>
        </div>
    );
};

export default Banner;
