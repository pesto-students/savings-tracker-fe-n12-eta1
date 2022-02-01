import axiosClient from '../../../axios';

import {auth} from '../../../firebase';

const getFunds = (async (goalID) => {
    
    return auth.currentUser.getIdToken().then(token => {
        const config = {
            headers: {'X-Auth-Token': token}
        };
        
        return axiosClient.get(process.env.REACT_APP_API_URL+'/api/funds/'+ goalID, config );

    });
});

const addFund = (data,goalID) => {

    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.post(process.env.REACT_APP_API_URL+'/api/funds/' + goalID+'/create', data, {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }

}

const updateFund = (goalID,fundId, data) => {
    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.put(process.env.REACT_APP_API_URL+'/api/funds/' + goalID+'/'+fundId+'/update', data, {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }

}

const deleteFund = (goalID,fundId) => {
    return auth.currentUser.getIdToken().then(token => {
        return axiosClient.delete(process.env.REACT_APP_API_URL+'/api/funds/' + goalID+'/'+fundId+'/delete', {headers: {'X-Auth-Token': token}});
    });
}

export {getFunds, addFund, updateFund,deleteFund};