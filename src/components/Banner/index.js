import banner from './images/banner.jpg';
import Button from '../common/Button/index.js';

import {signOut} from '../../auth';


import {useSelector} from "react-redux";


const Banner = ({show, setShow}) => {

    const user = useSelector((state) => state.user);


    return (
        <>
            <div className="w-100 min-vh-75 relative page-header" style={{backgroundImage: "url(" + banner + ")"}}>
                <span className="mask bg-gradient-primary opacity-4"></span>
                <div className="container text-center z-index-999 text-white">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="text-white">Savings Tracker</h1>
                            <p className="lead">looking to digitally track your financial goals and expenses with
                                minimal efforts?
                                <br/>We are there to help you
                            </p>
                            {user ? <div>Signed In with : {user.phoneNumber} <Button text="Sign Out"
                                                                                     extraClass="primary btn-round text-white"
                                                                                     onClick={signOut}/>
                                </div> :
                                <Button text="Get Started" extraClass="primary btn-round text-white"
                                        onClick={() => setShow(true)}/>}
                        </div>
                    </div>

                </div>
            </div>

        </>

    )

}

export default Banner;
  