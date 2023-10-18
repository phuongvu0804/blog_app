import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './DetailedUser.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';
import userService from '@/services/user.js';
import { setNoti } from '@/reducers/notiReducer';

import BlogItem from './components/BlogItem';
import UserInfo from './components/UserInfo';
import DetailedUserSkeleton from './components/DetailedUserSkeleton';

import { Alert, Typography } from '@mui/material';

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

    if (!loading) {
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
        <Container
            maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            className="user__container"
        >
            {noti.content && (
                <Alert severity={noti.type} className="noti">
                    {noti.content}
                </Alert>
            )}
            <div className="user__wrapper">
                <h1>{userData.name}</h1>
                <UserInfo className="hide-on-pc" data={userData} />
                <div className="user__blog-list">{renderBlogs()}</div>
            </div>
            <div className="user__wrapper hide-on-tablet-mobile">
                <UserInfo data={userData} />
            </div>
        </Container>
    );
};

export default DetailedUser;
