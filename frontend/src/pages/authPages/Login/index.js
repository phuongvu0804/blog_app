import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import '../authPages.scss';
import { actLogin } from '@/reducers/userReducer';

import { Alert, FormControl, Input, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user);
    const [formInputs, setFormInputs] = useState({
        username: '',
        password: '',
    });
    const [noti, setNoti] = useState({
        type: 'info',
        content: null,
    });

    useEffect(() => {
        if (login.error) {
            setNoti({
                type: 'error',
                content: login.error.response.data.error,
            });
        }
    }, [login.error]);

    const handleChange = (e) => {
        setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
    };

    const handleValidate = () => {
        let isValid = false;

        if (formInputs.username.length < 3) {
            return setNoti({
                type: 'error',
                content: 'Username must be at least 3 characters',
            });
        }

        if (formInputs.password.length < 6) {
            return setNoti({
                type: 'error',
                content: 'Password must be at least 6 characters',
            });
        }

        return (isValid = true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = handleValidate();

        if (isValid) {
            dispatch(
                actLogin(
                    {
                        username: formInputs.username,
                        password: formInputs.password,
                    },
                    navigate,
                ),
            );
        }
    };

    return (
        <form className="auth__form" onSubmit={handleSubmit}>
            {noti.content && (
                <Alert
                    severity={noti.type}
                    sx={{ fontSize: '1.6rem', marginBottom: '3rem' }}
                >
                    {noti.content}
                </Alert>
            )}

            <FormControl className="auth__input-group">
                <InputLabel>Username</InputLabel>
                <Input
                    name="username"
                    value={formInputs.username}
                    onChange={handleChange}
                />
            </FormControl>
            <FormControl className="auth__input-group">
                <InputLabel>Password</InputLabel>
                <Input
                    name="password"
                    type="password"
                    value={formInputs.password}
                    onChange={handleChange}
                />
            </FormControl>

            <LoadingButton
                loading={login.loading}
                type="submit"
                className="auth__input-btn"
                variant="contained"
            >
                Submit
            </LoadingButton>
        </form>
    );
};

export default Login;
