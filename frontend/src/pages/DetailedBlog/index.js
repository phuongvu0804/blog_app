import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './DetailedBlog.scss';
import blogService from '@/services/blog';
import setNoti from '@/reducers/notiReducer.js';

import Blog from './components/Blog';
import UserDetails from './components/UserDetails';
import DetailedBlogSkeleton from './components/DetailedBlogSkeleton';

import { Alert, Typography } from '@mui/material';
import { Container } from '@mui/system';

const DetailedBlog = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const noti = useSelector((state) => state.noti);
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    //Fetch blog details
    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const blogData = await blogService.getBlogById(id);
                setBlog(blogData);
            } catch (err) {
                dispatch(setNoti(err));
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort();
        };
    }, []);

    if (loading) {
        return <DetailedBlogSkeleton />;
    }

    if (!blog) {
        return (
            <Container maxWidth="lg" className="blog-details__container">
                <Typography variant="h4" sx={{ marginTop: 4 }}>
                    There is currently no information about this blog
                </Typography>
            </Container>
        );
    }

    return (
        <div className="blog-details__container">
            {noti.content && (
                <Alert severity={noti.type} className="noti">
                    {noti.content}
                </Alert>
            )}

            <Blog blogData={blog} />
            <UserDetails authorData={blog.author} />
        </div>
    );
};

export default DetailedBlog;
