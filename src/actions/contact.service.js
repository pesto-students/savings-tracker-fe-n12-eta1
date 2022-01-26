import axiosClient from "../axios";

const apiUrl = process.env.REACT_APP_API_URL+"/api/notifications/"

const ContactService = (data) => {
    try {
        console.log(data)
        //return axios.post(apiUrl+'submit-contact',data)
        return axiosClient.post(apiUrl+'submit-contact',data)
    } catch (e) {
        return {error: e.message}
    }

}

export default ContactService