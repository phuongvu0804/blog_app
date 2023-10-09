import { FormControl, Input, InputLabel } from '@mui/material';
import React from 'react';

import '../authPages.scss';

const SignUp = () => {
    return (
        <form className="auth__form">
            <FormControl className="auth__input-group">
                <InputLabel>Username</InputLabel>
                <Input defaultValue="" />
            </FormControl>
            <FormControl className="auth__input-group">
                <InputLabel>Name</InputLabel>
                <Input defaultValue="" />
            </FormControl>
            <FormControl className="auth__input-group">
                <InputLabel>Password</InputLabel>
                <Input defaultValue="" />
            </FormControl>
        </form>
    );
};

export default SignUp;
