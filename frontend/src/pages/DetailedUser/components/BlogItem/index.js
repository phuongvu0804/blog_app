import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './BlogItem.scss';

import { Skeleton } from '@mui/material';

import Image from '@/components/Image';
import { LikeButtonSkeleton } from '@/components/buttons/LikeButtonWithHOC';
import LikeButtonWithHOC from '@/components/buttons/LikeButtonWithHOC';
import SaveButtonWithHOC, {
    SaveButtonSkeleton,
} from '@/components/buttons/SaveButtonWithHOC';

export const BlogItemSkeleton = ({ className }) => {
    return (
        <div className={`user__blog-item ${className ? className : ''}`}>
            <Link to="/" className="blog-item__top">
                <div className="blog-item__left">
                    <Skeleton
                        className="blog-item__date"
                        variant="text"
                        sx={{ fontSize: '1.4rem' }}
                        width={80}
                    />
                    <Skeleton
                        className="blog-item__title"
                        component="h4"
                        variant="text"
                        sx={{ fontSize: '2rem' }}
                    />
                    <Skeleton
                        className="blog-item__content"
                        component="p"
                        variant="rounded"
                        width={556}
                        height={72}
                    />
                </div>
                <div className="blog-item__right">
                    <Skeleton variant="rounded" width={112} height={112} />
                </div>
            </Link>
            <div className="blog-item__bottom">
                <LikeButtonSkeleton />
                <SaveButtonSkeleton className="blog-item__btn" />
            </div>
        </div>
    );
};

const BlogItem = ({ data }) => {
    return (
        <div className="user__blog-item">
            <Link to="/" className="blog-item__top">
                <div className="blog-item__left">
                    <p className="blog-item__date">
                        {moment(data.createdAt).format('ll')}
                    </p>
                    <h4 className="blog-item__title">{data.title}</h4>
                    <p className="blog-item__content">{data.content}</p>
                </div>
                <div className="blog-item__right">
                    <Image src={data.image} />
                </div>
            </Link>
            <div className="blog-item__bottom">
                <LikeButtonWithHOC blogId={data.id}>
                    {data.likes ? data.likes.length : 0}
                </LikeButtonWithHOC>
                <SaveButtonWithHOC
                    className="blog-item__btn"
                    blogId={data.id}
                />
            </div>
        </div>
    );
};

export default memo(BlogItem);
