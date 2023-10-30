import axios from 'axios';

const baseUrl = '/api/users';

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const getUserById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
};

const updateUser = async (id, update) => {
    const response = await axios.put(`${baseUrl}/save/${id}`, update);
    return response.data;
};

const handleLikeBlog = async (blogId, userId) => {
    const response = await axios.put(`${baseUrl}/like/${blogId}`, userId);
    return response.data;
};

export default { getAll, getUserById, updateUser, handleLikeBlog };
