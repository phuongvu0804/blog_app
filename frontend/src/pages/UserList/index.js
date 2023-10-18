import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';
import './UserList.scss';
import userService from '@/services/user.js';
import { setNoti } from '@/reducers/notiReducer';

import RecommendationTopics from '@/components/RecommendationTopics';
import UserItem from './components/UserItem';

import { Container } from '@mui/system';
import { Alert, Grid, Typography } from '@mui/material';
import UserListSkeleton from './components/UserListSkeleton';

const UserList = () => {
    const dispatch = useDispatch();
    const noti = useSelector((state) => state.noti);
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserListData = async () => {
            try {
                const response = await userService.getAll();
                setUserList(response);
            } catch (err) {
                dispatch(setNoti(err));
            } finally {
                setLoading(false);
            }
        };

        fetchUserListData();
    }, []);

    if (loading) {
        return <UserListSkeleton />;
    }

    if (userList.length === 0) {
        return (
            <Container
                maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
                className="user-list__container"
            >
                <h1 className="user-list__title">List of users</h1>
                <Typography variant="h4" sx={{ marginTop: 2 }}>
                    There is no user in the system
                </Typography>
            </Container>
        );
    }

    return (
        <Container
            maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            className="user-list__container"
        >
            <h1 className="user-list__title">List of users</h1>
            {noti.content && (
                <Alert severity={noti.type} className="noti">
                    {noti.content}
                </Alert>
            )}
            <Grid container spacing={6}>
                <Grid item xs={12} md={8} className="user-list__wrapper">
                    {userList.map((user) => (
                        <UserItem userData={user} key={user.id} />
                    ))}
                </Grid>
                <Grid
                    item
                    md={4}
                    className="user-list__wrapper  hide-on-tablet-mobile"
                >
                    <RecommendationTopics />
                </Grid>
            </Grid>
        </Container>
    );
};

export default UserList;
