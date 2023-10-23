import axios from 'axios';

const login = async (user) => {
    const response = await axios.post('/api/login', user);
    return response.data;
};

const signUp = async (formData) => {
    console.log('signUp', formData);

    const response = await axios.post('/api/users', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export default { login, signUp };
