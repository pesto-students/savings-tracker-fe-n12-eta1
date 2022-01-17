// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import {Oval} from 'react-loader-spinner';

const Loader = ({visible}) => {

    return <Oval height="20" width="20" color="#e53270" visible={visible} wrapperStyle={{'alignItems': 'center','marginLeft':'1rem'}}/>
};

export default Loader