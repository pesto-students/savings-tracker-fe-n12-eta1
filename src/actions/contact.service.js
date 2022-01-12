import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL+"/api/notifications/"

const ContactService = () => {
    try {
        return axios.post(apiUrl+'submit-contact')
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