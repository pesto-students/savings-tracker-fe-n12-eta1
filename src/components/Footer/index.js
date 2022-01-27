import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import './index.css';
import logo from '../../logo.png';

import {useLocation} from "react-router-dom";


const Footer = () => {

    const location = useLocation().pathname;


    return (
        <>

            <footer className="footer footer-default">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <nav className="float-left">
                                <ul>
                                    <li>
                                        <Link className="nav-link navbar-brand" to="/">
                                            <img src={logo} className="App-logo" alt="logo"/>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/#team-section" reloadDocument={location === '/'}>About Us</Link>
                                    </li>
                                    <li>
                                        <Link to="/#contact-section" reloadDocument={location === '/'}>
                                            Contact Us
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-md-6">
                            <div className="copyright">
                                All rights reserved. Copyright © {new Date().getFullYear()} Savings Tracker.
                            </div>
                        </div>
                    </div>

                </div>
            </footer>

        </>

    )

}

export default Footer;
  