import {auth} from "../../../firebase";
import axiosClient from "../../../axios";

const getPortfolio = () => {

    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.get('/api/users/portfolio', {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }
}

const savePortfolio = (data) => {

    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.post('/api/users/portfolio', data, {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }

}

export {getPortfolio, savePortfolio}