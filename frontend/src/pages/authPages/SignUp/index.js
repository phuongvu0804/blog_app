import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import authService from '@/services/auth';

import { LoadingButton } from '@mui/lab';
import {
    Alert,
    Avatar,
    Button,
    FormControl,
    FormHelperText,
    TextField,
} from '@mui/material';

import '../authPages.scss';
import { actLogin } from '@/reducers/userReducer';
import { signUpSchema } from '@/validators/authValidator';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
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
        return (
            noti.content && (
                <Alert
                    severity={noti.type}
                    className="noti"
                    sx={{ fontSize: '1.6rem', marginBottom: '3rem' }}
                >
                    {noti.content}
                </Alert>
            )
        );
    };

    return (
        <form
            method="POST"
            className="auth__form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            {renderAlert()}
            <FormControl className="auth__input-group">
                <TextField
                    variant="standard"
                    label="Username"
                    name="username"
                    onBlur={handleBlur}
                    touched={touched.username}
                    error={errors.username && touched.username}
                    value={values.username}
                    onChange={handleChange}
                />
                {errors.username && touched.username && (
                    <FormHelperText className="auth__input-text" error>
                        {errors.username}
                    </FormHelperText>
                )}
            </FormControl>
            <FormControl className="auth__input-group">
                <TextField
                    label="Full name"
                    name="name"
                    variant="standard"
                    onBlur={handleBlur}
                    touched={touched.name}
                    error={errors.name && touched.name}
                    value={values.name}
                    onChange={handleChange}
                />
                {errors.name && touched.name && (
                    <FormHelperText className="auth__input-text" error>
                        {errors.name}
                    </FormHelperText>
                )}
            </FormControl>

            <FormControl className="auth__input-group">
                <TextField
                    label="Password"
                    variant="standard"
                    name="password"
                    onBlur={handleBlur}
                    touched={touched.password}
                    error={errors.password && touched.password}
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                />
                {errors.password && touched.password && (
                    <FormHelperText className="auth__input-text" error>
                        {errors.password}
                    </FormHelperText>
                )}
            </FormControl>
            <FormControl className="auth__input-group">
                <TextField
                    label="Bio"
                    rows={3}
                    variant="standard"
                    multiline
                    name="description"
                    onBlur={handleBlur}
                    touched={touched.description}
                    error={errors.description && touched.description}
                    value={values.description}
                    onChange={handleChange}
                />
                {errors.description && touched.description && (
                    <FormHelperText className="auth__input-text" error>
                        {errors.description}
                    </FormHelperText>
                )}
            </FormControl>

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
            >
                Submit
            </LoadingButton>
        </form>
    );
};

export default SignUp;
