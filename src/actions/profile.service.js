import axios from 'axios'

const apiUrl = "https://saving-tracker-backend.herokuapp.com/notification/api/"

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