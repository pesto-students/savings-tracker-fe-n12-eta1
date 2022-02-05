import './index.css';
import {
    Link
} from "react-router-dom";
import {signOut} from "../../auth";

const SideBar = ({active = 'dashboard'}) => {

    return (
        <>
            <div className="col-md-3 mb-4 mb-lg-0 d-flex d-sm-block" id="sidebar">
                <div className={active === 'dashboard' ? 'dash_bord active' : 'dash_bord'}>
                    <Link to="/dashboard">
                        <p><i className="fa fa-pie-chart mr-md-2"></i> <span
                            className="d-none d-sm-inline">Dashboard</span></p>
                    </Link>
                </div>

                <div className={active === 'goals' ? 'dash_bord active' : 'dash_bord'}>
                    <Link to="/goals">
                        <p><i className="fa fa-bullseye mr-md-2"></i> <span
                            className="d-none d-sm-inline">My Goals</span></p>
                    </Link>
                </div>
                <div className={active === 'portfolio' ? 'dash_bord active' : 'dash_bord'}>
                    <Link to="/portfolio">
                        <p><i className="fas fa-dollar-sign mr-md-2"></i><span
                            className="d-none d-sm-inline">&nbsp;&nbsp;Portfolio</span></p>
                    </Link>
                </div>
                <div className={active === 'subscription' ? 'dash_bord active' : 'dash_bord'}>
                    <Link to="/subscription">
                        <p><i className="fas fa-credit-card mr-md-2"></i> <span
                            className="d-none d-sm-inline">Subscription</span></p>
                    </Link>
                </div>
                <div className={active === 'profile' ? 'dash_bord active' : 'dash_bord'}>
                    <Link to="/profile">
                        <p><i className="fa fa-user mr-md-2"></i> <span className="d-none d-sm-inline">Profile</span>
                        </p>
                    </Link>
                </div>
                <div className={active === 'logout' ? 'dash_bord active' : 'dash_bord'}>
                    <a role="button" onClick={signOut}>
                        <i className="fas fa-sign-out-alt mr-md-2"></i> <span
                        className="d-none d-sm-inline">Sign out</span>
                    </a>
                </div>

            </div>
        </>
    );
};

export default SideBar