import {formatDateSimple} from "../../common/utils";
import React from 'react'

import {PlusCircleIcon, MinusCircleIcon, PencilAltIcon, TrashIcon} from '@heroicons/react/solid';

import Table from "../../common/Table";
import Button from "../../common/Button";

const frequency = ({frequency, frequency_type, frequency_unit}) => {

    if (frequency === 'One Time') {
        return frequency;
    }

    return frequency_unit + ' ' + frequency_type + (frequency_unit > 1 ? 's' : '');

};

const PortfolioTable = ({portfolios, onEditInit, onDeleteInit}) => {



    const columns = React.useMemo(
        () => [
            {
                "Header": "Date Added",
                "accessor": "created_date",
                "Cell": function ({value}) {

                    return formatDateSimple(value);
                }
            },
            {
                "Header": "Type",
                "accessor": "type",
                "Cell": function ({value}) {
                    return <i title={value}>

                        {value === 'Income' ? <PlusCircleIcon className="icon icon-portfolio text-success"/> :
                            <MinusCircleIcon className="icon icon-portfolio text-danger"/>}
                    </i>

                }
            }, {
                "Header": "Frequency",
                "accessor": "frequency",
                "Cell": function ({value, row}) {
                    return frequency(row.original)

                }
            }, {
                "Header": "Amount",
                "accessor": "amount"
            },
            {
                "Header": "Start Date",
                "accessor": "start_date",
                "Cell": function ({value}) {
                    return formatDateSimple(value);

                }
            },
            {
                "Header": "End Date",
                "accessor": "end_date",
                "Cell": function ({value}) {
                    return formatDateSimple(value);

                }
            },
            {
                "Header": "Description",
                "accessor": "description"
            },
            {
                "Header": "Action",
                // "accessor": "description"
                "Cell": function ({row}) {
                    return <>

                        <i title="Edit" className="cursor-pointer" onClick={() => {
                            onEditInit(row.original)
                        }}>
                            <PencilAltIcon
                                className="icon icon-portfolio text-gray"/>
                        </i>
                        <i title="Delete" className="ms-3 cursor-pointer" onClick={() => {
                            onDeleteInit(row.original)
                        }}>
                            <TrashIcon className="icon icon-portfolio text-danger"/>
                        </i>
                    </>
                }
            },
        ],
        [onEditInit, onDeleteInit]
    );


    const data = React.useMemo(() => portfolios, [portfolios]);

    return <Table columns={columns} data={data}/>;
}

export default PortfolioTable;