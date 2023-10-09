import React from 'react';
import { Link } from 'react-router-dom';

import Image from '@/components/Image';
import images from '@/assets/images';

const Logo = ({ className, ...props }) => {
    return (
        <Link to="/" className={className}>
            <Image className="logo__img" src={images.logo} {...props} />
        </Link>
    );
};

export default Logo;
