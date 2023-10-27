import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { handleConvertBinaryData } from '@/utils/binaryDataUtils';
import images from '@/assets/images';

const Avatar = forwardRef(
    (
        {
            imageData,
            alt,
            className,
            fallBack: customFallBack = images.noImage,
            ...props
        },
        ref,
    ) => {
        const [fallBack, setFallBack] = useState('');
        const imageSrc = handleConvertBinaryData(imageData?.data);

        useEffect(() => {
            setFallBack(customFallBack);
        }, []);

        const handleError = () => {
            setFallBack(customFallBack);
        };

        return (
            <img
                ref={ref}
                src={imageSrc || fallBack}
                alt={alt}
                className={className}
                onError={handleError}
                {...props}
            />
        );
    },
);

Avatar.propTypes = {
    imageData: PropTypes.object,
    alt: PropTypes.string,
    className: PropTypes.string,
    fallBack: PropTypes.string,
};

Avatar.displayName = 'Avatar';

export default Avatar;
