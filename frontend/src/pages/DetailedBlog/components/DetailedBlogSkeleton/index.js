import React from 'react';

import { BlogSkeleton } from '../Blog';
import { UserDetailsSkeleton } from '../UserDetails';

const DetailedBlogSkeleton = () => {
    return (
        <div className="blog-details__container">
            <BlogSkeleton />
            <UserDetailsSkeleton />
        </div>
    );
};

export default DetailedBlogSkeleton;
