import {useEffect, useState} from 'react';
import Button from '../../common/Button';
import Error from '../../common/Error';
import SideBar from '../../SideBar';
import DashboardBanner from '../../common/DashboardBanner';
import banner from './images/banner.jpg';
import {getFunds, addFund} from "../../Funds/api";
import FundForm from './FundModal';
import FundTable from "./FundTable";
import DeleteModal from "./DeleteModal";
import Spinner from "../../common/Spinner";


const ViewGoal = ({active,goal}) => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const [funds, setFunds] = useState([]);
    const [activeFund, setActiveFund] = useState(null);

    const [showFundModal, setShowFundModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        getData();

    }, []);

    const getData = () => {

        setError('');
        setLoading(true);

        getFunds().then(response => {

            let data = response.data;
            const funds = data.funds;

            setFunds(funds);
            setLoading(false);

        }).catch(err => {

            setError(err.message);
            setLoading(false);
        });

    };


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
                            <h1 className="font_30"><i className="fas fa-users-cog mr-2"></i>Goal Details</h1>                            

                            <div className="row">
                                <div className="col-sm-9 col-md-6">
                                    <h3>{goal.title}</h3>
                                    <p>Total amount to pay: {goal.amount}</p>
                                    <p>Start Date: {goal.start_date}</p>
                                    <p>End Date: {goal.end_date}</p>
                                </div>
                                <div className="col-sm-3 col-md-6">
                                    <Button onClick={() => {
                                        setShowFundModal(true)
                                    }} type="submit" text="Add New"
                                            extraClass="primary btn-round text-white float-md-end"/>
                                </div>
                            </div>
                            {loading ? <Spinner/> : error ? <Error message={error}/> :
                                <FundTable funds={fund}
                                                onEditInit={(fund) => {
                                                    setActiveFund(fund);
                                                    setShowFundModal(true);
                                                }}
                                                onDeleteInit={(fund) => {
                                                    setActiveFund(fund);
                                                    setShowDeleteModal(true);
                                                }}/>}


                            {/*fund popup*/}
                            {showFundModal && <FundForm fund={activeFund} show={showFundModal}
                                                                  handleClose={() => {
                                                                      setShowFundModal(false);
                                                                      setActiveFund(null);
                                                                  }}
                                                                  onSubmitSuccess={() => {
                                                                      getData()
                                                                  }}
                            />}
                            <DeleteModal fund={activeFund} show={showDeleteModal} handleClose={() => {
                                setShowDeleteModal(false);
                                setActiveFund(null);
                            }}
                                         onSubmitSuccess={() => {
                                             getData()
                                         }}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ViewGoal;