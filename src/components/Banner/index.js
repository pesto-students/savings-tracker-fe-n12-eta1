import banner from './images/banner.jpg';
import Button from '../common/Button/index.js';

import {auth} from '../../firebase';

import {signOut} from "firebase/auth";


import {useEffect, useState} from "react";


const Banner = ({show, setShow}) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(function (user) {
            setUser(user);
        });

    }, []);


    const logOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    };


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
                            {user ? <div>Signed In with : {user.phoneNumber} <Button text="Sign Out" extraClass="primary btn-round text-white" onClick={logOut}/>
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
  