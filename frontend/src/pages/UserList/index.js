import React, { useEffect, useState } from 'react';

import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';
import './UserList.scss';
import userService from '@/services/user.js';

import RecommendationTopics from '@/components/RecommendationTopics';

import UserItem from './UserItem';
import { Container } from '@mui/system';
import { Grid } from '@mui/material';

const UserList = () => {
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        const fetchUserListData = async () => {
            const response = await userService.getAll();
            setUserList(response);
        };

        fetchUserListData();
    }, []);

    return (
        <Container
            maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
            className="user-list__container"
        >
            <h1 className="user-list__title">List of users</h1>
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
