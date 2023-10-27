import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';

import '../authPages.scss';
import { actLogin } from '@/reducers/userReducer';
import { logInSchema } from '@/validators/authValidator';

import { Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import InputGroup from '../components/InputGroup';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loading } = useSelector((state) => state.user);

    const { handleSubmit, values, errors, touched, handleChange, handleBlur } =
        useFormik({
            initialValues: {
                username: '',
                password: '',
            },
            validationSchema: logInSchema,
            onSubmit: async () => {
                dispatch(actLogin(values, navigate));
            },
        });

    const renderNoti = () => {
        if (error) {
            return (
                <Alert
                    severity="error"
                    className="noti"
                    sx={{ fontSize: '1.6rem', marginBottom: '3rem' }}
                >
                    {error}
                </Alert>
            );
        }
    };

    const renderInputs = () => {
        const inputList = ['username', 'password'];
        return inputList.map((input, item) => (
            <InputGroup
                key={item}
                inputName={input}
                values={values[input]}
                errors={errors[input]}
                touched={touched[input]}
                handleBlur={handleBlur}
                handleChange={handleChange}
            />
        ));
    };

    return (
        <form className="auth__form" onSubmit={handleSubmit}>
            {renderNoti()}
            {renderInputs()}

            <LoadingButton
                loading={loading}
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
