import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';

import '../authPages.scss';
import { actLogin } from '@/reducers/userReducer';

import { Alert, Button, FormControl, Input, InputLabel } from '@mui/material';
const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [noti, setNoti] = useState({
        type: 'info',
        content: null,
    });

    const handleValidate = () => {
        let isValid = false;

        if (username.length < 3) {
            return setNoti({
                type: 'error',
                content: 'Username must be at least 3 characters',
            });
        }

        if (password.length < 6) {
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
            try {
                dispatch(
                    actLogin(
                        {
                            username,
                            password,
                        },
                        navigate,
                    ),
                );
                setNoti({
                    type: 'success',
                    content: 'You have logged in successfully',
                });
            } catch (err) {
                switch (err.response.status) {
                    case 401:
                        setNoti({
                            type: 'error',
                            content: err.message,
                        });
                        break;
                    default:
                        setNoti({
                            type: 'error',
                            content: err.message,
                        });
                }
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </FormControl>
            <FormControl className="auth__input-group">
                <InputLabel>Password</InputLabel>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormControl>
            <Button
                type="submit"
                className="auth__input-btn"
                variant="contained"
            >
                Submit
            </Button>
        </form>
    );
};

export default Login;
