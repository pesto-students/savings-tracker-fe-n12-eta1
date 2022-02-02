import React, {useState} from "react";
import {formatDateSimple} from "../../common/utils";
import Button from "../../common/Button";

const PaymentsTable = ({payments}) => {
    return <>
        <table className="table table-info mb-0">
            <thead>
            <tr>
                <th>Payment date</th>
                <th>Amount</th>
            </tr>
            </thead>
            <tbody>
            {payments.map(payment => {
                return <tr key={payment.id}>
                    <td>{formatDateSimple(payment.created_at)}</td>
                    <td>{payment.currency} {payment.amount / 100}</td>
                </tr>
            })
            }
            </tbody>
        </table>
    </>


};

const Row = ({subscription}) => {

    const [expanded, setExpanded] = useState(false);


    return <>
        <tr
            className={subscription.status === 'active' ? 'bg-info text-white' : ''}>
            <td>{formatDateSimple(subscription.paid_on)}</td>
            <td>{subscription.status}</td>
            <td>{formatDateSimple(subscription.cancelled_on)}</td>
            <td><Button disabled={!subscription.payments || subscription.payments.length === 0}
                        onClick={() => setExpanded(!expanded)} text={'Show'}/></td>
        </tr>
        {expanded && < tr>
            < td colSpan="4" className="p-0"><PaymentsTable payments={subscription.payments}/></td>
        </tr>}
    </>


}

const TransactionsTable = ({subscriptions}) => {

    if (!subscriptions || subscriptions.length === 0) {
        return <p>No Transactions</p>
    }


    return <div className="table-responsive">
        <table className="table align-middle">
            <thead>
            <tr>
                <th>Created On</th>
                <th>Status</th>
                <th>Cancelled On</th>
                <th>Payments</th>
            </tr>
            </thead>
            <tbody>
            {subscriptions.map(transaction => {

                return <Row key={transaction._id} subscription={transaction}/>
            })
            }
            </tbody>
        </table>
    </div>
}

export default TransactionsTable;