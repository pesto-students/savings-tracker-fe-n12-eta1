import {auth} from "../../../firebase";
import axiosClient from "../../../axios";

const getDashboardData = () => {

    try {
        
        return auth.currentUser.getIdToken().then(token => {
            
            const config = {
                headers: {'X-Auth-Token': token}
            };
            
            return axiosClient.get(process.env.REACT_APP_API_URL+'/api/users/dashboard', config );
            /*
            return {
                "data":{
                "code": 200,
                "success": true,
                "dashboard": {
                    "goals": [
                        {
                            "_id": "Pending",
                            "count": 5
                        },
                        {
                            "_id": "New",
                            "count": 3
                        },
                        {
                            "_id": null,
                            "count": 4
                        },
                        {
                            "_id": "Completed",
                            "count": 3
                        }
                    ],
                    "salary": 1000
                }
            }
        }
        */
            

        });
    } catch (e) {
        return {error: e.message}
    }
}

export {
    getDashboardData
}