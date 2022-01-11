import {Link} from "react-router-dom";
import './index.css';
import logo from '../../logo.png';
import Button from "../common/Button";
import {useSelector} from "react-redux";

import {signOut} from "../../auth";

import {MailIcon, HomeIcon, ChartPieIcon} from '@heroicons/react/outline'

const Header = ({active = 'home', setShow}) => {

    const user = useSelector((state) => state.user);


    return (
        <>
            <header className="w-100 fixed">

                <nav
                    className="navbar py-0 navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg blur border-radius-xl shadow my-3 mx-7"
                    color-on-scroll="100" id="sectionsNav">
                    <div className="container">
                        <div className="navbar-translate">
                            <Link className="nav-link navbar-brand" to="/">
                                <img src={logo} className="App-logo" alt="logo"/>
                            </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="navbar-toggler-icon"></span>
                                <span className="navbar-toggler-icon"></span>
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav ml-auto nav-ul">
                                <li className={active === 'home' ? 'nav-item active pr-2' : 'nav-item pr-2'}>
                                    <Link className="nav-link flex align-item-center" to="/">
                                        <HomeIcon className="icon-nav mr-4p"/>
                                        <span>Home</span>
                                    </Link>
                                </li>
                                {user &&
                                <li className={active === 'dashboard' ? 'nav-item pr-2' : 'nav-item pr-2'}>
                                    <Link to="/dashboard" className="nav-link flex align-item-center">

                                        <ChartPieIcon className="icon-nav mr-4p"/>
                                        <span>Dashboard</span>
                                    </Link>
                                </li>
                                }
                                {
                                    !user &&
                                <li className={active === 'home' ? 'nav-item pr-2' : 'nav-item pr-2'}>
                                    <a className="nav-link flex align-item-center" href="#contact-section">
                                        <MailIcon className="icon-nav mr-4p"/>
                                        <span>Contact Us</span>
                                    </a>
                                </li>
                                }

                                <li className='nav-item'>
                                    {user ?
                                        <Button text="Sign Out" extraClass="primary btn-round text-white"
                                                onClick={signOut}/> :
                                        <Button text="Sign In" extraClass="primary btn-round text-white"
                                                onClick={() => {
                                                    setShow(true)
                                                }}/>}

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
  