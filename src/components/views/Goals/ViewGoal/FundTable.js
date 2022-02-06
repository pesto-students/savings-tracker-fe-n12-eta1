import {formatDateSimple} from "../../../common/utils";
import React from 'react'
import {PlusCircleIcon, MinusCircleIcon, PencilAltIcon, TrashIcon} from '@heroicons/react/solid';
import Table from "../../../common/Table";

const FundTable = ({funds, onEditInit, onDeleteInit, currency}) => {


    const columns = React.useMemo(
        () => [
            {
                "Header": "Date Added",
                "accessor": "created_at",
                "sortType": 'datetime',
                "Cell": function ({value}) {
                    return formatDateSimple(value);
                }
            },
            {
                "Header": "Amount",
                "accessor": "amount",
                "sortType": 'number',
                "Cell": function ({value}) {
                    return currency+' '+ value.toLocaleString();
                }

            },
            {
                "Header": "Description",
                "accessor": "description",
            },
            {
                "Header": "Action",
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
            }
        ],
        [onEditInit, onDeleteInit]
    );


    // const data = React.useMemo(() => funds, [funds]);

    const data = React.useMemo(() => funds.map(fund => {
        return {
            ...fund,
            created_at: new Date(fund.created_at),

        }
    }), [funds]);

    return <Table columns={columns} data={data}/>;
}

export default FundTable;