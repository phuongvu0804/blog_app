import React from 'react';
import { Link } from 'react-router-dom';

import Image from '@/components/Image';
import images from '@/assets/images';

const Logo = () => {
    return (
        <Link to="/">
            <Image className="logo__img" src={images.logo} />
        </Link>
    );
};

export default Logo;
