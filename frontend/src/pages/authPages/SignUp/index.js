import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import authService from '@/services/auth';

import { LoadingButton } from '@mui/lab';
import { Alert, Avatar, Button, FormControl } from '@mui/material';

import '../authPages.scss';
import { actLogin } from '@/reducers/userReducer';
import { signUpSchema } from '@/validators/authValidator';
import InputGroup from '../components/InputGroup';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.user);
    const [imagePreview, setImagePreview] = useState(null);
    const [noti, setNoti] = useState({
        type: 'info',
        content: null,
    });

    const handleUploadAvatar = (e) => {
        setFieldValue('image', e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const initialValues = {
        name: '',
        username: '',
        password: '',
        description: '',
        image: '',
    };

    const {
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur,
    } = useFormik({
        initialValues,
        validationSchema: signUpSchema,
        onSubmit: async () => {
            let formData = new FormData();
            for (const key in initialValues) {
                if (key === 'image') {
                    formData.append('image', values.image);
                } else {
                    formData.append(key, values[key]);
                }
            }

            try {
                await authService.signUp(formData);

                setNoti({
                    type: 'success',
                    content: 'You have signed up successfully',
                });

                setTimeout(() => {
                    dispatch(
                        actLogin(
                            {
                                username: values.username,
                                password: values.password,
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
        },
    });

    const renderAlert = () => {
        if (noti.content) {
            return (
                <Alert
                    severity={noti.type}
                    className="noti"
                    sx={{ fontSize: '1.6rem', marginBottom: '3rem' }}
                >
                    {noti.content}
                </Alert>
            );
        }
    };

    const renderInputs = () => {
        const inputList = ['username', 'name', 'password', 'description'];

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
        <form
            method="POST"
            className="auth__form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            {renderAlert()}
            {renderInputs()}

            <FormControl className="auth__input-group">
                <Button
                    variant="text"
                    component="label"
                    sx={{
                        color: 'var(--black)',
                        textDecoration: 'underline',
                        textTransform: 'none',
                    }}
                >
                    Upload avatar
                    <input
                        hidden
                        accept="image/*"
                        type="file"
                        name="image"
                        onChange={handleUploadAvatar}
                    />
                </Button>
                <Avatar
                    alt="Remy Sharp"
                    src={imagePreview}
                    sx={{ margin: '1.2rem auto 0' }}
                />
            </FormControl>

            <LoadingButton
                type="submit"
                className="auth__input-btn"
                variant="contained"
                loading={loading}
            >
                Submit
            </LoadingButton>
        </form>
    );
};

export default SignUp;
