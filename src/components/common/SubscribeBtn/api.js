import {auth} from "../../../firebase";
import axiosClient from "../../../axios";

const createSubscription = (data) => {

    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.post('/api/subscription', data, {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }

};

const verifySubscription = (data) => {

    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.post('/api/subscription/verify', data, {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }

};


export {createSubscription, verifySubscription}