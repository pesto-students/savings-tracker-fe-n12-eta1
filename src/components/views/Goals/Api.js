import axiosClient from '../../../axios';
import {auth} from '../../../firebase';

const getGoals = (async (filterData) => {

    return auth.currentUser.getIdToken().then(token => {
        const config = {
            headers: {'X-Auth-Token': token},
            params: filterData
        };

        return axiosClient.get(process.env.REACT_APP_API_URL + '/api/goals', config);

    });
});

const getGoal = (async (goalID) => {

    return auth.currentUser.getIdToken().then(token => {
        const config = {
            headers: {'X-Auth-Token': token}
        };

        return axiosClient.get(process.env.REACT_APP_API_URL + '/api/goals/' + goalID, config);

    });
});

const addGoal = (data) => {

    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.post(process.env.REACT_APP_API_URL + '/api/goals', data, {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }

}

const updateGoal = (goalID, data) => {
    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.put('/api/goals/' + goalID, data, {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }

}

const deleteGoal = (goalId) => {
    return auth.currentUser.getIdToken().then(token => {
        return axiosClient.delete('/api/goals/' + goalId, {headers: {'X-Auth-Token': token}});
    });
}

export {getGoals, getGoal, addGoal, updateGoal, deleteGoal};