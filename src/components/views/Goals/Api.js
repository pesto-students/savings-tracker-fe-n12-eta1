import axiosClient from '../../../axios';

import {auth} from '../../../firebase';

const getGoals = (data={}) => {


    return auth.currentUser.getIdToken().then(token => {
        console.log(token)
        return axiosClient.get('/api/goals/', data, {headers: {'X-Auth-Token': token}});
    });
};

export {getGoals};