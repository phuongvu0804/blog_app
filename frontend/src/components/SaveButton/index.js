import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { IconButton } from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import './SaveButton.scss';
import { appendSavedBlog } from '@/reducers/userReducer';
import { LOCAL_STORAGE_KEY } from '@/constants';

const SaveButton = ({ className, blogId }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [onSaved, setOnSaved] = useState(false);

    const handleClick = () => {
        const user = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!user) {
            navigate('/login');
        } else {
            dispatch(appendSavedBlog(blogId));
            setOnSaved(!onSaved);
        }
    };

    return (
        <IconButton className={className} onClick={handleClick}>
            {onSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>
    );
};

export default SaveButton;
