import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './DetailedUser.scss';
import userService from '@/services/user.js';
import { setNoti } from '@/reducers/notiReducer';

import BlogItem from './components/BlogItem';
import DetailedUserSkeleton from './components/DetailedUserSkeleton';

import { Alert, Typography } from '@mui/material';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants/appSettings';

const DetailedUser = () => {
    const { id } = useParams();
    const noti = useSelector((state) => state.noti);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        const fetchUserData = async () => {
            try {
                const response = await userService.getUserById(id);
                setUserData(response);
            } catch (error) {
                dispatch(setNoti(error));
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();

        return () => {
            controller.abort();
        };
    }, []);

    const renderBlogs = () => {
        return userData.blogs.map((blog) => (
            <BlogItem key={blog.id} data={blog} />
        ));
    };

    if (loading) {
        return <DetailedUserSkeleton />;
    }

    if (!userData) {
        return (
            <Container
                maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
                className="user__container"
            >
                <Typography variant="h4" sx={{ marginTop: 2 }}>
                    There is no data about this user
                </Typography>
            </Container>
        );
    }

    return (
        <div className="user__blog-list">
            {noti.content && (
                <Alert severity={noti.type} className="noti">
                    {noti.content}
                </Alert>
            )}
            {renderBlogs()}
        </div>
    );
};

export default DetailedUser;
