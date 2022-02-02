import SideBar from '../../SideBar';
import SubscribeBtn from "../../common/SubscribeBtn";
import banner from "../Dashboard/images/banner.jpg";
import DashboardBanner from "../../common/DashboardBanner";

import {useEffect, useState} from 'react';
import {getSubscriptionStatus} from "./api";
import TransactionsTable from "./transactions-table";
import CancelSubscriptionBtn from "./cancel-subscription-btn";
import Error from "../../common/Error";
import Spinner from "../../common/Spinner";
import {Tabs, Tab} from "react-bootstrap";


import {LightningBoltIcon} from '@heroicons/react/solid';
import {formatDateSimple} from "../../common/utils";


function add1YearToDate(date) {
    const yearAhead = new Date(date);

    yearAhead.setFullYear(yearAhead.getFullYear() + 1);

    return yearAhead;
}

const Subscription = ({active}) => {

    const [mostRecentSubscription, setMostRecentSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [subscriptions, setSubscriptions] = useState([]);

    const [serverErrors, setServerErrors] = useState(false);

    const [tabKey, setTabKey] = useState('status');

    useEffect(() => {
        getInitialData();
    }, []);


    const getInitialData = () => {
        setLoading(true);
        getSubscriptionStatus().then(({data}) => {

            setSubscriptions(data.subscriptions);

            if (data.subscriptions.length > 0) {
                setMostRecentSubscription(data.subscriptions[0]);
            }

            setLoading(false);

        }).catch(handleServerError)
    };


    const handleServerError = (error) => {
        const errors = error.response?.data?.errors || [error.message];
        setServerErrors(errors);
        setLoading(false);
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
                            <div className="row">
                                <div className="col">
                                    <h1 className="font_30"><i className="fa fa-credit-card mr-2"></i>Subscription</h1>
                                </div>
                            </div>
                            <div className="row">
                                <Tabs
                                    onSelect={setTabKey}
                                    defaultActiveKey="status"
                                    transition={false}
                                    id="subscription-tabs"
                                    className="mb-3"
                                >
                                    <Tab eventKey="status" title="Status"
                                         tabClassName={"text-primary " + (tabKey === 'status' ? 'fw-bold' : '')}>
                                        <div className="row">
                                            <div className="col">
                                                <h3 className="fs-3">Status {!loading && (mostRecentSubscription?.status === 'active' ?
                                                    <LightningBoltIcon
                                                        className="icon-lg text-success"/> : <LightningBoltIcon
                                                        className="icon-lg text-danger"/>)}</h3>
                                                {loading && <Spinner/>}
                                                {!loading && (mostRecentSubscription?.status === 'active' ?

                                                        <div>
                                                            <div>
                                                                <p className="d-md-inline">Your Subscription is active
                                                                    since <b>{formatDateSimple(mostRecentSubscription.paid_on)}</b>
                                                                </p>
                                                                <CancelSubscriptionBtn
                                                                    className="ms-md-3 mb-3"
                                                                    onSuccess={getInitialData}/></div>
                                                            <p>Next charge
                                                                on <b>{formatDateSimple(add1YearToDate(mostRecentSubscription.paid_on))}</b>
                                                            </p>
                                                        </div>
                                                        :
                                                        <div>Your Subscription is not active <SubscribeBtn
                                                            className="ms-3"
                                                            onSuccess={getInitialData}/>
                                                        </div>
                                                )}
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="subscriptions"
                                         title={"History" + (loading ? '' : ` (${subscriptions.length})`)}
                                         tabClassName={"text-primary " + (tabKey === 'subscriptions' ? 'fw-bold' : '')}>

                                        {!loading && <div className="row mt-3">
                                            <div className="col">
                                                <h3 className="fs-3">Subscriptions</h3>
                                                <TransactionsTable subscriptions={subscriptions}/>
                                            </div>
                                        </div>}
                                    </Tab>
                                </Tabs>
                            </div>

                            {serverErrors && <div className="row">
                                <div className="col"><Error message={serverErrors}/></div>
                            </div>
                            }

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Subscription