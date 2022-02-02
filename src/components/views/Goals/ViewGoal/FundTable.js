import {formatDateSimple} from "../../../common/utils";
import React from 'react'
import {PlusCircleIcon, MinusCircleIcon, PencilAltIcon, TrashIcon} from '@heroicons/react/solid';
import Table from "../../../common/Table";

const FundTable = ({funds, onEditInit, onDeleteInit}) => {


    const columns = React.useMemo(
        () => [
            {
                "Header": "Date Added",
                "accessor": "created_at",
                "Cell": function ({value}) {

                    return formatDateSimple(value);
                }
            },
            {
                "Header": "Type",
                "accessor": "fund_type"
                
            },          
            {
                "Header": "Amount",
                "accessor": "amount"
            },
            {
                "Header": "Last Updated",
                "accessor": "updated_at",
                "Cell": function ({value}) {
                    return formatDateSimple(value);

                }
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
            }
        ],
        [onEditInit, onDeleteInit]
    );


    const data = React.useMemo(() => funds, [funds]);

    return <Table columns={columns} data={data}/>;
}

export default FundTable;