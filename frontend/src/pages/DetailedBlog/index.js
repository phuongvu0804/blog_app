import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './DetailedBlog.scss';
import blogService from '@/services/blog';

import Blog from './components/Blog';
import UserDetails from './components/UserDetails';
import DetailedBlogSkeleton from './components/DetailedBlogSkeleton';

const DetailedBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    //Fetch blog details
    useEffect(() => {
        const controller = new AbortController();

        const fetchBlogDetails = async () => {
            const blogData = await blogService.getBlogById(id);
            setBlog(blogData);
        };

        fetchBlogDetails();

        return () => {
            controller.abort();
        };
    }, []);

    if (!blog) {
        return <DetailedBlogSkeleton />;
    }

    return (
        <div className="blog-details__container">
            <Blog blogData={blog} />
            {blog.author && <UserDetails authorId={blog.author.id} />}
        </div>
    );
};

export default DetailedBlog;
