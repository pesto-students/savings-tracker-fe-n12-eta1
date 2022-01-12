import {
    BrowserRouter as Router,
    Link,
} from "react-router-dom";
import './index.css';
import logo from '../../logo.png';

const Footer = () => {

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
                                        <Link to="/#team-section">About Us</Link>

                                        {/* <a href="/#team-section">
                                            About Us
                                        </a>*/}
                                    </li>
                                    <li>
                                        <a href="/#contact-section">
                                            Contact Us
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-md-6">
                            <div className="copyright">
                                ©
                                <script>
                                    document.write(new Date().getFullYear())
                                </script>All rights reserved. Copyright © 2022 Savings Tracker.
                            </div>
                        </div>
                    </div>

                </div>
            </footer>

        </>

    )

}

export default Footer;
  