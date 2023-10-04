import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './DetailedBlog.scss';
import blogService from '@/services/blog';
import { fetchUserData } from '@/reducers/userReducer';

import Blog from './components/Blog';
import { useDispatch } from 'react-redux';
import UserDetails from './components/UserDetails';
import DetailedBlogSkeleton from './components/DetailedBlogSkeleton';

const DetailedBlog = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
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

    //Fetch user details
    useEffect(() => {
        if (blog?.author) {
            dispatch(fetchUserData(blog?.author.id));
        }
    }, [blog]);

    if (!blog) {
        return <DetailedBlogSkeleton />;
    }

    return (
        <div className="blog-details__container">
            <Blog blogData={blog} />
            <UserDetails />
        </div>
    );
};

export default DetailedBlog;
