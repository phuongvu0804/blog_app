import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';

import images from '@/assets/images';

const Image = forwardRef(
    (
        {
            src,
            alt,
            className,
            fallBack: customFallBack = images.noImage,
            ...props
        },
        ref,
    ) => {
        const [fallBack, setFallBack] = useState('');

        const handleError = () => {
            setFallBack(customFallBack);
        };

        return (
            <img
                ref={ref}
                src={src || fallBack}
                alt={alt}
                className={className}
                onError={handleError}
                {...props}
            />
        );
    },
);

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallBack: PropTypes.string,
};

Image.displayName = 'Image';

export default Image;
