import {useEffect, useState} from 'react';
import Button from '../../../common/Button';
import Error from '../../../common/Error';
import SideBar from '../../../SideBar';
import DashboardBanner from '../../../common/DashboardBanner';
import banner from '../images/target.jpg';
import {getFunds, addFund} from "../../Funds/api";
import {getGoal} from "../Api"
import FundForm from './FundModal';
import FundTable from "./FundTable";
import DeleteModal from "./DeleteModal";
import Spinner from "../../../common/Spinner";
import {useParams} from 'react-router-dom';
import {formatDateSimple} from "../../../common/utils";
import {CalendarIcon} from '@heroicons/react/solid';

const ViewGoal = ({active}) => {
    const {goalId} = useParams();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [goal, setGoal] = useState('');
    const [funds, setFunds] = useState([]);
    const [activeFund, setActiveFund] = useState(null);
    const [currency, setCurrency] = useState('INR');
    const [showFundModal, setShowFundModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {

        setError('');
        setLoading(true);
        getGoal(goalId).then(response => {

            let data = response.data;
            setGoal(data.goal);
            setCurrency(data.currency)
            getFunds(goalId).then(fund_response => {

                let data = fund_response.data;
                const funds = data.funds;
                setFunds(funds);
                setLoading(false);

            }).catch(err => {
                setError(err.message);
                setLoading(false);
            });

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
                            <h1 className="font_30"><i className="fas fa-bullseye mr-2"></i>Goal Details</h1>
                            <div className="row">
                                <div className="col-sm-9 col-md-6">
                                    <h2>{goal.title}</h2>
                                </div>
                                <div className="col-sm-3 col-md-6">
                                    <Button onClick={() => {
                                        setShowFundModal(true)
                                    }} type="submit" text="Add Funds"
                                            extraClass="primary btn-round text-white float-md-end"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <h4>Target: <b>{currency + " " + goal.total_amount.toLocaleString()}</b></h4>
                                    <h4>Duration: <b>
                                        <CalendarIcon
                                            className="icon-portfolio"
                                        />
                                        {formatDateSimple(goal.start_date)} - {formatDateSimple(goal.end_date)}
                                    </b></h4>


                                    <h4>Details: </h4>
                                    <p>{goal.description}</p>
                                </div>

                            </div>
                            {loading ? <Spinner/> : error ? <Error message={error}/> :
                                <>

                                    <h3 className="mt-3">Goal Funds History</h3>
                                    <FundTable currency={currency} funds={funds} goalId={goalId}
                                               onEditInit={(fund) => {
                                                   setActiveFund(fund);
                                                   setShowFundModal(true);
                                               }}
                                               onDeleteInit={(fund) => {
                                                   setActiveFund(fund);
                                                   setShowDeleteModal(true);
                                               }}/>
                                </>
                            }


                            {/*fund popup*/}
                            {showFundModal && <FundForm fund={activeFund} goalId={goalId} show={showFundModal}
                                                        handleClose={() => {
                                                            setShowFundModal(false);
                                                            setActiveFund(null);
                                                        }}
                                                        onSubmitSuccess={() => {
                                                            getData()
                                                        }}
                            />}
                            <DeleteModal fund={activeFund} goalId={goalId} show={showDeleteModal} handleClose={() => {
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