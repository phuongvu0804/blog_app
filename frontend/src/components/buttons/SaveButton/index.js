import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import { IconButton, Skeleton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import './SaveButton.scss';
import { LOCAL_STORAGE_KEY } from '@/constants';
import { actSaveBlog } from '@/reducers/userReducer';

export const SaveButtonSkeleton = ({ className }) => {
    return (
        <Skeleton
            className={className}
            variant="rounded"
            width={15}
            height={15}
        />
    );
};

//Avoid unnecessary rerender when clicking save
const SaveButton = ({ className, blogId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.data); //wrong logic, match only with author case
    const [onSaved, setOnSaved] = useState(false);

    useEffect(() => {
        let isExisted = false;

        userData?.savedBlogs.forEach((blog) => {
            if (blog.id === blogId) {
                return (isExisted = true);
            }
        });

        if (isExisted) {
            setOnSaved(true);
        }
    }, [userData]);

    const handleClick = async () => {
        const user = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!user) {
            return navigate('/login');
        }

        dispatch(actSaveBlog(userData.id, blogId));
        setOnSaved(!onSaved);
    };

    return (
        <IconButton className={className} onClick={handleClick}>
            {onSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
    );
};

SaveButton.propTypes = {
    blogId: PropTypes.string.isRequired,
};

export default SaveButton;
