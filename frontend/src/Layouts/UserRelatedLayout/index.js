import { Container } from '@mui/system';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '@/pages/DetailedUser/DetailedUser.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants/appSettings';
import { fetchAuthorData } from '@/reducers/authorReducer';

import { Alert, Typography } from '@mui/material';

import DetailedUserSkeleton from '@/pages/DetailedUser/components/DetailedUserSkeleton';
import HeaderOnlyLayout from '@/layouts/HeaderOnlyLayout';
import UserInfo from './components/UserInfo';

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

    const loading = id ? authorLoading : userLoading;
    const data = id ? authorData : userData;

    useEffect(() => {
        const controller = new AbortController();

        if (id) {
            dispatch(fetchAuthorData(id));
        }

        return () => {
            controller.abort();
        };
    }, [id]);

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
