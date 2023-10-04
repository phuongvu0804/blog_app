import axios from 'axios';

const baseUrl = '/api/blogs';

// let token;

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const getBlogById = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
};

export default { getAll, getBlogById };
