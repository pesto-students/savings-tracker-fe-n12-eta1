import {useEffect, useState} from 'react';
import DashboardBanner from '../../common/DashboardBanner';
import './index.css';
import banner from './images/banner.jpg';
import SideBar from '../../SideBar';
import {getDashboardData} from './api'
import PieChart from '../../common/Graphs/piechart';
import LineChart from '../../common/Graphs/index'
import Skeleton from '../../common/Skeleton';
import DatesRangePicker from "../../common/DateRangePicker/index";
import Error from "../../common/Error";
import {useDispatch} from "react-redux";

const Dashboard = ({active}) => {
    const dispatch = useDispatch();
    let goals = []
    const [dashboard, setDashboard] = useState('')
    const [total, setTotal] = useState(0)
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true)
    const [currency, setCurrency] = useState('');
    const [filter, setFilter] = useState({});

    useEffect(() => {
        setLoading(true)
        getData(filter)
    }, []);

    const getData = (filters) => {
        setError('');

        dispatch({type: 'PAGE_LOADING', payload: true});


        getDashboardData(filters).then(response => {
            goals = response.data.dashboard.goals
            var total = goals.map(goal => goal.count).reduce((acc, goal) => goal + acc);
            setDashboard(response.data.dashboard)
            setTotal(total);
            setLoading(false)
            dispatch({type: 'PAGE_LOADING', payload: false});

            setCurrency(response.data.currency);
        }).catch(err => {
            dispatch({type: 'PAGE_LOADING', payload: false});

            setError(err.message);
            setLoading(false)
        });

    }

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
                            {loading && <Skeleton totalCollections="1"/>}
                            {!loading &&
                            <div className="row mt-5 mb-3 justify-content-start">
                                <div className="col-md-3 col-lg-3 col-6 mb-4 mb-lg-0" style={{display: "none"}}>
                                    <div className="dashboard_div">

                                        <div className="row h-100">
                                            <div className="col-8 pr-0 d-flex align-content-center">
                                                <div>
                                                    <h1 className="mb-0">{total}</h1>
                                                    <p className="mb-0">Total Goals</p>
                                                </div>
                                            </div>
                                            <div className="col-4 d-flex">
                                                <i className="fa fa-clock mt-auto text-primary font_30"
                                                   aria-hidden="true"></i>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {dashboard.goals && dashboard.goals.map((item, index) => {

                                    return (
                                        item._id != null &&

                                        <div className="col-md-3 col-lg-3 col-6 mb-4 mb-lg-0">
                                            <div className="dashboard_div">
                                                <div className="row h-100">
                                                    <div className="col-md-8">
                                                        <div>
                                                            <h1 className="mb-0">{item.count}</h1>
                                                            <p className="mb-0">{item._id} Goals</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 d-flex">

                                                        <i className="fa fa-clock mt-auto text-primary font_30"
                                                           aria-hidden="true"></i>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )

                                })}

                                <div className="col-md-3 col-lg-3 col-6 mb-4 mb-lg-0">
                                    <div className="dashboard_div">
                                        <div className="row h-100">
                                            <div className="col-md-8 pr-0 d-flex align-content-center">
                                                <div>
                                                    <h1 className="mb-0">{dashboard.salary.toLocaleString()}</h1>
                                                    <p className="mb-0">Income {currency}</p>
                                                    
                                                </div>
                                            </div>
                                            

                                        </div>
                                    </div>
                                </div>

                            </div>
                            }

                            {dashboard.chart_data &&

                            <>
                                <div className="row mt-5 mb-3 justify-content-start">


                                    <div className="col-md-8">
                                        <DatesRangePicker
                                            start_date={dashboard.start_date}
                                            end_date={dashboard.end_date}
                                            onSubmitSuccess={(filterDate) => {
                                                getData(filterDate)
                                            }}
                                        />
                                        {error && <Error message={error}/>}
                                    </div>

                                </div>
                                <div className="row mt-5 mb-3 justify-content-start">

                                    <div className="col-md-6">
                                        <LineChart columns={dashboard.chart_data}/>
                                    </div>
                                    <div className="col-md-6">
                                        <PieChart columns={dashboard.chart_data}/>
                                    </div>
                                </div>
                            </>


                            }

                        </div>

                    </div>
                </div>
            </div>

        </>
    );
};

export default Dashboard;
