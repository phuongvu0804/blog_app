import React from 'react';

import { Box } from '@mui/material';

import { HEADER_HEIGHT_DEFAULT_LAYOUT } from '@/constants';
import './Home.scss';

import Banner from './components/Banner';

const Home = () => {
    return (
        <div>
            <Box sx={{ height: HEADER_HEIGHT_DEFAULT_LAYOUT }} />
            <Banner />
        </div>
    );
};

export default Home;
