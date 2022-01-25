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

const Subscription = ({active}) => {

    const [subscriptionActive, setSubscriptionActive] = useState(null);
    const [loading, setLoading] = useState(true);
    const [transactions, setTransactions] = useState([]);
    const [serverErrors, setServerErrors] = useState(false);

    useEffect(() => {
        getInitialData();
    }, []);


    const getInitialData = () => {
        setLoading(true);
        getSubscriptionStatus().then(({data}) => {

            setTransactions(data.transactions);

            if (data.transactions.length > 0) {
                const mostRecentTransaction = data.transactions[0];
                setSubscriptionActive(mostRecentTransaction.status === 'active');
            }


            setLoading(false);

        }).catch(handleServerError)
    }


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

                            {serverErrors ? <div className="row">
                                    <div className="col"><Error message={serverErrors}/></div>
                                </div> :
                                <>

                                    <div className="row">
                                        <div className="col">
                                            <h3 className="fs-3">Status</h3>
                                            {loading && <Spinner/>}
                                            {!loading && (subscriptionActive ?

                                                    <div>Your Subscription is active <CancelSubscriptionBtn
                                                        className="ms-3"
                                                        onSuccess={() => getInitialData()}/>
                                                    </div>
                                                    :
                                                    <div>Your Subscription is not active <SubscribeBtn className="ms-3"
                                                                                                       onSuccess={() => getInitialData()}/>
                                                    </div>
                                            )}
                                        </div>
                                    </div>
                                    {!loading && <div className="row mt-3">
                                        <div className="col">
                                            <h3 className="fs-3">Transactions</h3>
                                            <TransactionsTable transactions={transactions}/>
                                        </div>
                                    </div>}
                                </>
                            }

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Subscription