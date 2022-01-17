import {auth} from "../../../firebase";
import axiosClient from "../../../axios";

const getUserStatus = () => {

    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.get('/api/users/onboarding', {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }

}

export {getUserStatus}