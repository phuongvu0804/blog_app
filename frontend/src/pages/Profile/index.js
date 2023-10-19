import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MuiTabs from './components/MuiTabs';

const Profile = () => {
    const { data } = useSelector((state) => state.user);

    return <MuiTabs data={data} />;
};

export default Profile;
