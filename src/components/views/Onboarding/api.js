import axiosClient from '../../../axios';

const postToApi = (data) => {
    return axiosClient.post('/', data);
};

export {postToApi};