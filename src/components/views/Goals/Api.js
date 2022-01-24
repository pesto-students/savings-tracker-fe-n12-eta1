import axiosClient from '../../../axios';

import {auth} from '../../../firebase';

const getGoals = (async (filterData) => {
    
    return auth.currentUser.getIdToken().then(token => {
        // console.log(token)

        const config = {
            headers: {'X-Auth-Token': token},
            params: filterData
        };
        
        return axiosClient.get(process.env.REACT_APP_API_URL+'/api/goals/', config );

    });
});

const addGoal = (data) => {

    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.post(process.env.REACT_APP_API_URL+'/api/goals/', data, {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }

}

const updateGoal = (goalID, data) => {
    console.log(goalID)
    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.put('/api/goals/' + goalID, data, {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }

}

const deleteGoal = (goalId) => {
    console.log(goalId)
    return auth.currentUser.getIdToken().then(token => {
        return axiosClient.delete('/api/goals/' + goalId, {headers: {'X-Auth-Token': token}});
    });
}

export {getGoals, addGoal, updateGoal,deleteGoal};