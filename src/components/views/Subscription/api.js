import {auth} from "../../../firebase";
import axiosClient from "../../../axios";

function getSubscriptionStatus() {
    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.get('/api/subscription', {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }
}

function cancelSubscription() {
    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.post('/api/subscription/cancel', {}, {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }
}

export {getSubscriptionStatus, cancelSubscription}