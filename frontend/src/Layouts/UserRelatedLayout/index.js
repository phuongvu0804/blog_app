import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '@/pages/DetailedUser/DetailedUser.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';
import { fetchAuthorData } from '@/reducers/authorReducer';

import { Alert, Typography } from '@mui/material';

import UserInfo from '@/pages/DetailedUser/components/UserInfo';
import DetailedUserSkeleton from '@/pages/DetailedUser/components/DetailedUserSkeleton';
import HeaderOnlyLayout from '@/Layouts/HeaderOnlyLayout';

const UserRelatedLayout = ({ children }) => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const noti = useSelector((state) => state.noti);
    const { data: userData, loading: userLoading } = useSelector(
        (state) => state.user,
    );
    const { data: authorData, loading: authorLoading } = useSelector(
        (state) => state.author,
    );

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        if (id) {
            dispatch(fetchAuthorData(id));
        } else {
            console.log('running user', userData);
            setData(userData);
            setLoading(userLoading);
        }

        return () => {
            controller.abort();
        };
    }, [id]);

    useEffect(() => {
        if (id) {
            setData(authorData);
            setLoading(authorLoading);
        } else {
            setData(userData);
            setLoading(userLoading);
        }
    }, [authorData, userData]);

    if (loading) {
        return <DetailedUserSkeleton />;
    }

    if (!loading && !data) {
        return (
            <HeaderOnlyLayout>
                <Container
                    maxWidth={MAX_WIDTH_DEFAULT_LAYOUT}
                    className="user__container"
                >
                    <Typography variant="h4" sx={{ marginTop: 2 }}>
                        There is no data about this user
                    </Typography>
                </Container>
            </HeaderOnlyLayout>
        );
    }

    return (
        <HeaderOnlyLayout>
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
                    <h1>{data.name}</h1>
                    <UserInfo className="hide-on-pc" data={data} />
                    {children}
                </div>
                <div className="user__wrapper hide-on-tablet-mobile">
                    <UserInfo data={data} />
                </div>
            </Container>
        </HeaderOnlyLayout>
    );
};

export default UserRelatedLayout;
