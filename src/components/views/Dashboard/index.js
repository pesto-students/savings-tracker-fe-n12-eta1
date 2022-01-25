import DashboardBanner from '../../common/DashboardBanner';
import './index.css';
import banner from './images/banner.jpg';
import SideBar from '../../SideBar';

const Dashboard = ({active}) => {

    return (
        <>
            <DashboardBanner
                image={banner}
            />

            <div className="main main-raised dashoard-container">
                <div className="container">
                    <div className="row">
                        <SideBar active={active}/>
                        <div className="col-md-9">
                            <h1 className="font_30"><i className="fa fa-home mr-2"></i>Dashboard</h1>

                            <div className="row mt-5">
                                <div className="col-md-3 col-lg-3 col-6 mb-4 mb-lg-0">
                                    <div className="dashboard_div active">
                                        <div className="row h-100">
                                            <div className="col-8 pr-0 d-flex align-content-center">
                                                <div>
                                                    <h1 className="mb-0">5</h1>
                                                    <p className="mb-0">Total Goals</p>
                                                </div>
                                            </div>
                                            <div className="col-4 d-flex">
                                                <i className="fa fa-bullseye mt-auto text-white font_30"
                                                   aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-lg-3 col-6 mb-4 mb-lg-0">
                                    <div className="dashboard_div">
                                        <div className="row h-100">
                                            <div className="col-8 pr-0 d-flex align-content-center">
                                                <div>
                                                    <h1 className="mb-0">2</h1>
                                                    <p className="mb-0">Pending Goals</p>
                                                </div>
                                            </div>
                                            <div className="col-4 d-flex">
                                                <i className="fa fa-clock mt-auto text-primary font_30"
                                                   aria-hidden="true"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3 col-lg-3 col-6 mb-4 mb-lg-0">
                                    <div className="dashboard_div">
                                        <div className="row h-100">
                                            <div className="col-8 pr-0 d-flex align-content-center">
                                                <div>
                                                    <h1 className="mb-0">3</h1>
                                                    <p className="mb-0">Completed Goals</p>
                                                </div>
                                            </div>
                                            <div className="col-4 d-flex">
                                                <i className="fa fa-check-circle mt-auto text-primary font_30"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 col-lg-3 col-6 mb-4 mb-lg-0">
                                    <div className="dashboard_div">
                                        <div className="row h-100">
                                            <div className="col-8 pr-0 d-flex align-content-center">
                                                <div>
                                                    <h1 className="mb-0">50,000</h1>
                                                    <p className="mb-0">Income</p>
                                                </div>
                                            </div>
                                            <div className="col-4 d-flex">
                                                <i className="fa fa-dollar-sign mt-auto text-primary font_30"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Dashboard