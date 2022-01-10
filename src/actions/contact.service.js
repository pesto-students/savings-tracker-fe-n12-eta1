import axios from 'axios'

const apiUrl = "https://saving-tracker-backend.herokuapp.com/api/notifications/"

const ContactService = () => {
    try {
        return axios.post(apiUrl + 'submit-contact')
            .then(response => {
                //console.log("in fn",res.data.results)
                //const response = res;
                return (response)
            })
    } catch (e) {
        return {error: e.message}
    }

}

export default ContactService