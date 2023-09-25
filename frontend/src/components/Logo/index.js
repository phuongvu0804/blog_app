import React from 'react';
import { Link } from 'react-router-dom';

import Image from '@/components/Image';
import images from '@/assets/images';

const Logo = ({ className, ...props }) => {
    return (
        <Link to="/">
            <Image
                className={`logo__img ${className}`}
                src={images.logo}
                {...props}
            />
        </Link>
    );
};

export default Logo;
