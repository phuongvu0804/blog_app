import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import authService from '@/services/auth';

import { LoadingButton } from '@mui/lab';
import { Alert, FormControl, Input, InputLabel } from '@mui/material';

import '../authPages.scss';
import { actLogin } from '@/reducers/userReducer';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formInputs, setFormInputs] = useState({
        username: '',
        name: '',
        password: '',
    });
    const [noti, setNoti] = useState({
        type: 'info',
        content: null,
    });

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

        if (formInputs.name.length < 3) {
            return setNoti({
                type: 'error',
                content: 'Name must be at least 3 characters',
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
            console.log(formInputs);

            try {
                await authService.signUp(formInputs);

                setNoti({
                    type: 'success',
                    content: 'You have signed up successfully',
                });

                setTimeout(() => {
                    dispatch(
                        actLogin(
                            {
                                username: formInputs.username,
                                password: formInputs.password,
                            },
                            navigate,
                        ),
                    );
                }, 1000);
            } catch (err) {
                setNoti({
                    type: 'error',
                    content: err.response.data.error,
                });
            }
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
                <InputLabel>Name</InputLabel>
                <Input
                    name="name"
                    value={formInputs.name}
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
                type="submit"
                className="auth__input-btn"
                variant="contained"
            >
                Submit
            </LoadingButton>
        </form>
    );
};

export default SignUp;