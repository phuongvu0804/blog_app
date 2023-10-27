import { FormControl, FormHelperText, TextField } from '@mui/material';
import React, { memo } from 'react';

const InputGroup = ({
    inputName,
    value,
    error,
    touched,
    handleBlur,
    handleChange,
}) => {
    return (
        <FormControl className="auth__input-group">
            <TextField
                label={
                    inputName === 'description'
                        ? 'Bio'
                        : inputName.charAt(0).toUpperCase() + inputName.slice(1)
                }
                variant="standard"
                name={inputName}
                onBlur={handleBlur}
                touched={touched?.toString()}
                error={error && touched}
                type={inputName === 'password' ? 'password' : 'text'}
                value={value}
                onChange={handleChange}
            />
            {error && touched && (
                <FormHelperText className="auth__input-text" error>
                    {error}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default memo(InputGroup);
