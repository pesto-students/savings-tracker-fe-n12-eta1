import axiosClient from '../../../axios';

import {auth} from '../../../firebase';

const getGoals = (async (data = {}) => {
    
    return auth.currentUser.getIdToken().then(token => {
        // console.log(token)

        const config = {
            headers: {'X-Auth-Token': token},
            params: filterData
        };
        
        return axiosClient.get(process.env.REACT_APP_API_URL+'/api/goals/', config );

    });
});

export {getGoals};