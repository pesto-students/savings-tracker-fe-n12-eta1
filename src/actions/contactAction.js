import axios from 'axios'

const apiUrl = "https://saving-tracker-backend.herokuapp.com/notification/api/"

function contactAction() {
    try{
        return axios.post(apiUrl+'submit-contact')
        .then(response => {
            //console.log("in fn",res.data.results)
            //const response = res;
            return (response)
          })
    }catch(e){
        return {error:e.message}
    }
    
}

export default contactAction