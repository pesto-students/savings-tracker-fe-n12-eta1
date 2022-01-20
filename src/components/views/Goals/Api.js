import axiosClient from '../../../axios';

import {auth} from '../../../firebase';

const getGoals = (async (data = {}) => {
    return {
        status: 200,
        success: true,
        goals_data: [
            {
                title: "Car",
                description: "Get your dream car",
                start_date: "22-04-2022",
                end_date: "22-10-2023",
                amount: 130000,
                status: 'active'
            },
            {
                title: "Home",
                description: "Get your dream house",
                start_date: "22-04-2010",
                end_date: "22-10-2015",
                amount: 2500000,
                status: 'active'
            },
            {
                title: "Home",
                description: "Get your dream house",
                start_date: "22-04-2010",
                end_date: "22-10-2015",
                amount: 2500000,
                status: 'achieved'
            },
            {
                title: "Bike",
                description: "Get your dream Bike",
                start_date: "22-04-2010",
                end_date: "22-10-2015",
                amount: 2500000,
                status: 'recent'
            }
        ]
    }
    return auth.currentUser.getIdToken().then(token => {
        //console.log(token)

        return axiosClient.get(process.env.REACT_APP_API_URL + '/api/goals/', data, {headers: {'X-Auth-Token': token}});
    });
});

export {getGoals};