import React from "react";
import {formatDateSimple} from "../../common/utils";

const TransactionsTable = ({transactions}) => {

    if (!transactions || transactions.length === 0) {
        return <p>No Transactions</p>
    }


    return <div className="table-responsive">
        <table className="table">
            <thead>
            <tr>
                <th>Created On</th>
                <th>Status</th>
                <th>Cancelled On</th>
            </tr>
            </thead>
            <tbody>
            {transactions.map(transaction => {

                return <tr key={transaction._id}
                           className={transaction.status === 'active' ? 'bg-success text-white' : ''}>
                    <td>{formatDateSimple(transaction.createdAt)}</td>
                    <td>{transaction.status}</td>
                    <td>{formatDateSimple(transaction.cancelled_on)}</td>
                </tr>
            })
            }
            </tbody>
        </table>
    </div>
}

export default TransactionsTable;