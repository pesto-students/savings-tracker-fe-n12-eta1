import axiosClient from "../axios";

const apiUrl = process.env.REACT_APP_API_URL + "/api/notifications/"

const ContactService = (data) => {
    try {
        return axiosClient.post(apiUrl + 'submit-contact', data)
    } catch (e) {
        return {error: e.message}
    }

}

export default ContactService