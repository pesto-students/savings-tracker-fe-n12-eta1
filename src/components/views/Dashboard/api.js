import {auth} from "../../../firebase";
import axiosClient from "../../../axios";

const getDashboardData = (filters) => {

    try {
        
        return auth.currentUser.getIdToken().then(token => {
            
            const config = {
                headers: {'X-Auth-Token': token}
            };
            
            return axiosClient.post(process.env.REACT_APP_API_URL+'/api/users/dashboard',filters, config );
            

        });
    } catch (e) {
        return {error: e.message}
    }
}

// const getFilteredData = (data) => {

//     try {
        
//         return auth.currentUser.getIdToken().then(token => {
            
//             const config = {
//                 headers: {'X-Auth-Token': token}
//             };
            
//             return axiosClient.post(process.env.REACT_APP_API_URL+'/api/users/dashboard',data, config );

//         });
//     } catch (e) {
//         return {error: e.message}
//     }
// }

export {
    getDashboardData,
    //getFilteredData
}