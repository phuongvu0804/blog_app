import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '@/pages/DetailedUser/DetailedUser.scss';
import { MAX_WIDTH_DEFAULT_LAYOUT } from '@/constants';
import { fetchAuthorData } from '@/reducers/authorReducer';
import { handleConvertBinaryData } from '@/utils/binaryDataUtils';

import { Alert, Typography } from '@mui/material';

import UserInfo from '@/pages/DetailedUser/components/UserInfo';
import DetailedUserSkeleton from '@/pages/DetailedUser/components/DetailedUserSkeleton';
import HeaderOnlyLayout from '@/layouts/HeaderOnlyLayout';

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
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        if (id) {
            dispatch(fetchAuthorData(id));
        } else {
            setData(userData);
        }

        return () => {
            controller.abort();
        };
    }, [id]);

    useEffect(() => {
        if (id) {
            setLoading(authorLoading);
        } else {
            setLoading(userLoading);
        }
    }, [userLoading, authorLoading]);

    useEffect(() => {
        if (id && authorData) {
            setData(authorData);
            const convertedImageUrl = handleConvertBinaryData(
                authorData?.image?.data,
            );
            if (convertedImageUrl) {
                setImageUrl(convertedImageUrl);
            }
        } else if (!id && userData) {
            setData(userData);
            const convertedImageUrl = handleConvertBinaryData(
                userData?.image?.data,
            );
            if (convertedImageUrl) {
                setImageUrl(convertedImageUrl);
            }
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
                    <UserInfo
                        className="hide-on-pc"
                        data={data}
                        image={imageUrl}
                    />
                    {children}
                </div>
                <div className="user__wrapper hide-on-tablet-mobile">
                    <UserInfo data={data} image={imageUrl} />
                </div>
            </Container>
        </HeaderOnlyLayout>
    );
};

export default UserRelatedLayout;
