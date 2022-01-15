import axiosClient from '../../../axios';

import {auth} from '../../../firebase';

const postToApi = (data) => {

    return auth.currentUser.getIdToken().then(token => {
        return axiosClient.post('/api/users/onboarding', data, {headers: {'X-Auth-Token': token}});
    });
};

export {postToApi};