import './index.css';
import {
    Link
} from "react-router-dom";

const SideBar = ({active = 'dashboard'}) => {

    return (
        <>
            <div className="col-md-3 mb-4 mb-lg-0">
                <div className={active === 'dashboard' ? 'dash_bord active' : 'dash_bord'}>
                    <Link to="/dashboard">
                        <p><i className="fa fa-home mr-2"></i> Dashboard</p>
                    </Link>
                </div>

                <div className={active === 'goals' ? 'dash_bord active' : 'dash_bord'}>
                    <Link to="/goals">
                        <p><i className="fa fa-bullseye mr-2"></i>My Goals</p>
                    </Link>
                </div>
                <div className={active === 'portfolio' ? 'dash_bord active' : 'dash_bord'}>
                    <Link to="/portfolio">
                        <p><i className="fas fa-users-cog mr-2"></i> Portfolio </p>
                    </Link>
                </div>
                <div className={active === 'subscription' ? 'dash_bord active' : 'dash_bord'}>
                    <Link to="/subscription">
                        <p><i className="fas fa-credit-card mr-2"></i> Subscription </p>
                    </Link>
                </div>
                <div className={active === 'profile' ? 'dash_bord active' : 'dash_bord'}>
                    <Link to="/profile">
                        <p><i className="fa fa-user mr-2"></i> Profile</p>
                    </Link>
                </div>
                <div className={active === 'logout' ? 'dash_bord active' : 'dash_bord'}>
                    <Link to="/logout">
                        <p><i className="fas fa-sign-out-alt mr-2"></i> Sign out</p>
                    </Link>
                </div>

            </div>
        </>
    );
};

export default SideBar