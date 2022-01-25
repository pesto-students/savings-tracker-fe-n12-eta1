import {useEffect, useState} from 'react';
import DashboardBanner from '../../common/DashboardBanner';
import './index.css';
import banner from './images/banner.jpg';
import SideBar from '../../SideBar';
import {getDashboardData} from './api'
//import PieChart from '../../common/Graphs/index';
import LineChart from '../../common/Graphs/index'

/*const columns=  [
    ["Expenses", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
    ["Income", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8]
]*/

const Dashboard = ({active}) => {
    let goals = []
    const [dashboard,setDashboard] = useState('')
    const [total,setTotal] = useState(0)
    const [error, setError] = useState('');

    useEffect(() => {
             getData() 
    }, []);

    const getData = () => {
        setError('');
        getDashboardData().then(response=>{
            goals = response.data.dashboard.goals
            var total = goals.map(goal => goal.count).reduce((acc, goal) => goal + acc);
            setDashboard(response.data.dashboard)  
            setTotal(total)
            console.log(response.data.dashboard.chart_data) 
        }).catch(err => {

            setError(err.message);
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

                        <SideBar active={active} />
                        <div className="col-md-9">
                        <h1 className="font_30"><i className="fa fa-home mr-2"></i>Dashboard</h1>
        
                        <div className="row mt-5">
                        <div className="col-md-3 col-lg-3 col-6 mb-4 mb-lg-0">
                                <div className="dashboard_div active">
                                    <div className="row h-100">
                                        <div className="col-8 pr-0 d-flex align-content-center">
                                            <div>
                                                <h1 className="mb-0">{total}</h1>
                                                <p className="mb-0">Total Goals</p>
                                            </div>
                                        </div>
                                        <div className="col-4 d-flex">
                                        <i className="fa fa-bullseye mt-auto text-white font_30" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            { dashboard.goals && dashboard.goals.map((item,index)=>{ 
                                
                                return (
                                    item._id!=null &&
                                    <div className="col-md-3 col-lg-3 col-6 mb-4 mb-lg-0">
                                        <div className="dashboard_div">
                                            <div className="row h-100">
                                                <div className="col-8 pr-0 d-flex align-content-center">
                                                    <div>
                                                        <h1 className="mb-0">{item.count}</h1>
                                                        <p className="mb-0">{item._id} Goals</p>
                                                    </div>
                                                </div>
                                                <div className="col-4 d-flex">
                                                <i className="fa fa-clock mt-auto text-primary font_30" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                )
                                
                            })}
                            
                            { dashboard.salary &&
                            <div className="col-md-3 col-lg-3 col-6 mb-4 mb-lg-0">
                                <div className="dashboard_div">
                                    <div className="row h-100">
                                        <div className="col-8 pr-0 d-flex align-content-center">
                                            <div>
                                                <h1 className="mb-0">{dashboard.salary}</h1>
                                                <p className="mb-0">Income</p>
                                            </div>
                                        </div>
                                        <div className="col-4 d-flex">
                                        <i className="fa fa-dollar-sign mt-auto text-primary font_30"></i>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                        {dashboard.chart_data && 
                            <div className="col-md-9">
                                <LineChart columns={dashboard.chart_data}/>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </>
    );
};

export default Dashboard
/*
<div className="col-md-9">
                            <PieChart columns={columns}/>
                        </div>
*/