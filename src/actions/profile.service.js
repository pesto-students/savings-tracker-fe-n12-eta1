import axios from 'axios'

//const apiUrl = "https://saving-tracker-backend.herokuapp.com/api/notifications/"
const apiUrl =process.env.REACT_APP_API_URL+"/api/notifications/"

const ProfileService = () => {
    try {
        return axios.post(apiUrl + 'update-profile')
            .then(response => {
                //console.log("in fn",res.data.results)
                //const response = res;
                return (response)
            })
    } catch (e) {
        return {error: e.message}
    }

}

export default ProfileService