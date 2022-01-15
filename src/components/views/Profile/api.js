import {auth} from "../../../firebase";
import axiosClient from "../../../axios";

const saveProfile = (data) => {

    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.post('/api/users/profile', data, {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }

}

const getProfile = () => {

    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.get('/api/users/profile', {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }
}

export {saveProfile, getProfile}