import {formatDateSimple} from "../../common/utils";
import React from 'react'

import {PlusCircleIcon, MinusCircleIcon, PencilAltIcon, TrashIcon} from '@heroicons/react/solid';

const PortfolioTable = ({portfolios, onEditInit, onDeleteInit}) => {

    if (portfolios.length === 0) return <div>No Data</div>;

    const frequency = ({frequency, frequency_type, frequency_unit}) => {

        if (frequency === 'One Time') {
            return frequency;
        }

        return frequency_unit + ' ' + frequency_type + (frequency_unit > 1 ? 's' : '');

    };

    return <table className="table table-responsive">
        <thead>
        <tr>
            <th scope="col">Date Added</th>
            <th scope="col">Type</th>
            <th scope="col">Frequency</th>
            <th scope="col">Amount</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
        </tr>
        </thead>
        <tbody>
        {portfolios.map(portfolio => {
            return <tr key={portfolio._id}>
                <td scope="row">{formatDateSimple(portfolio.created_date)}</td>
                <td>
                    <i title={portfolio.type}>

                        {portfolio.type === 'Income' ? <PlusCircleIcon className="icon icon-portfolio text-success"/> :
                            <MinusCircleIcon className="icon icon-portfolio text-danger"/>}
                    </i>
                </td>
                <td>{frequency(portfolio)}</td>
                <td>{portfolio.amount}</td>
                <td>{formatDateSimple(portfolio.start_date)}</td>
                <td>{formatDateSimple(portfolio.end_date)}</td>
                <td>{portfolio.description}</td>
                <td>
                    <i title="Edit" className="cursor-pointer" onClick={() => {
                        onEditInit(portfolio)
                    }}>
                        <PencilAltIcon
                            className="icon icon-portfolio text-gray"/>
                    </i>
                    <i title="Delete" className="ms-3 cursor-pointer" onClick={() => {
                        onDeleteInit(portfolio)
                    }}>
                        <TrashIcon className="icon icon-portfolio text-danger"/>
                    </i>
                </td>
            </tr>
        })}

        </tbody>
    </table>
}

export default PortfolioTable;