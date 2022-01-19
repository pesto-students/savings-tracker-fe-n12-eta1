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

const addPortfolio = (data) => {

    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.post('/api/users/portfolio', data, {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }

}

const updatePortfolio = (portfolioId, data) => {

    try {
        return auth.currentUser.getIdToken().then(token => {
            return axiosClient.put('/api/users/portfolio/' + portfolioId, data, {headers: {'X-Auth-Token': token}});
        });
    } catch (e) {
        return {error: e.message}
    }

}

const deletePortfolio = (portfolioId) => {
    return auth.currentUser.getIdToken().then(token => {
        return axiosClient.delete('/api/users/portfolio/' + portfolioId, {headers: {'X-Auth-Token': token}});
    });
}
const saveCurrency = (data) => {
    return auth.currentUser.getIdToken().then(token => {
        return axiosClient.post('/api/users/portfolio/currency', data, {headers: {'X-Auth-Token': token}});
    });
}
export {getPortfolio, addPortfolio, saveCurrency, updatePortfolio, deletePortfolio}