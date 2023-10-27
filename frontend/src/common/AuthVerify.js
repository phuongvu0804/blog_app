import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LOCAL_STORAGE_KEY } from '@/constants/appSettings';
import { parseJwt } from '@/utils/functions';
import { useDispatch } from 'react-redux';
import { actLogOut } from '@/reducers/userReducer';

const AuthVerify = (props) => {
    let location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

        if (user) {
            const decodedJwt = parseJwt(user.token);

            if (decodedJwt.exp * 1000 < Date.now()) {
                dispatch(actLogOut(navigate));
            }
        }
        console.log('AuthVerify', user);
    }, [location, props]);

    return;
};

export default AuthVerify;
