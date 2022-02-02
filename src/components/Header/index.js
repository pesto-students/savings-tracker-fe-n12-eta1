import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import './index.css';
import logo from '../../logo.png';
import Button from "../common/Button";
import {useSelector} from "react-redux";

import {useLocation} from "react-router-dom";


import {signOut} from "../../auth";

import {MailIcon, HomeIcon, ChartPieIcon} from '@heroicons/react/outline'


const Header = ({setShowSignIn, setShowDummyCredentials}) => {

    const location = useLocation().pathname;

    const user = useSelector((state) => state.user);

    return (
        <>
            <header className="w-100 fixed">

                <nav
                    className="navbar py-0 navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg blur border-radius-xl shadow my-3 mx-md-5 mx-3"
                    color-on-scroll="100" id="sectionsNav">
                    <div className="container-fluid">
                        <div className="navbar-translate">
                            <Link className="nav-link navbar-brand px-0" to="/">
                                <img src={logo} className="App-logo" alt="logo"/>
                            </Link>
                            {/*<button className="navbar-toggler" type="button" data-toggle="collapse"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="navbar-toggler-icon"></span>
                                <span className="navbar-toggler-icon"></span>
                                <span className="navbar-toggler-icon"></span>
                            </button>*/}
                        </div>
                        {/*<div className="collapse navbar-collapse">*/}
                        <div className="">
                            <ul className="navbar-nav ml-auto nav-ul flex-row">
                                <li className={(location === '/' ? 'active ' : '') + 'nav-item pe-sm-2 pe-md-3 pe-1'}>
                                    <Link className="nav-link flex align-item-center" to="/">
                                        <HomeIcon className="icon-nav mr-4p"/>
                                        <span className="d-none d-sm-inline">Home</span>
                                    </Link>
                                </li>
                                {user && location === '/' &&
                                <li className="nav-item pe-sm-2 pe-md-3 pe-1">
                                    <Link to="/dashboard" className="nav-link flex align-item-center">

                                        <ChartPieIcon className="icon-nav mr-4p"/>
                                        <span className="d-none d-sm-inline">Dashboard</span>
                                    </Link>
                                </li>
                                }

                                <li id="contact-us-item"
                                    className={location === 'home' ? 'nav-item pr-2' : 'nav-item pr-2'}>
                                    <Link reloadDocument={location === '/'} className="nav-link flex align-item-center"
                                          to="/#contact-section">
                                        <MailIcon className="icon-nav mr-4p"/>
                                        <span className="d-none d-sm-inline">Contact Us</span>
                                    </Link>
                                </li>


                                <li className='nav-item'>
                                    {user ?
                                        <Button text="Sign Out" extraClass="primary btn-round text-white"
                                                onClick={signOut}/> :
                                        <>
                                            <Button text="Sign In" extraClass="primary btn-round text-white"
                                                    onClick={() => {
                                                        setShowSignIn(true)
                                                    }}/>
                                            <Button text="Dummy Credentials" extraClass="info ms-3 btn-round text-white"
                                                    onClick={() => {
                                                        setShowDummyCredentials(true)
                                                    }}/>
                                        </>
                                    }

                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </header>

        </>

    )

}

export default Header;
  