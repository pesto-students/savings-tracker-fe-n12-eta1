import React, {useEffect} from 'react'
import {useTable, usePagination} from 'react-table'
import ReactPaginate from "react-paginate";
import {useSearchParams} from 'react-router-dom';


function getInitialPageIndex(searchParams) {
    let page = searchParams.get('page');

    if (isNaN(page)) {
        return 0;
    }

    return Number(page) - 1;


}

function Table({columns, data, defaultPageSize = 5, selectOptions = [5, 10, 50]}) {

    const [searchParams, setSearchParams] = useSearchParams();


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,

        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,

        pageOptions,
        state,
        rows,

        gotoPage,
        pageCount,

        setPageSize


    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageIndex: getInitialPageIndex(searchParams),
                pageSize: isNaN(searchParams.get('size')) ? defaultPageSize : Number(searchParams.get('size'))
            }
        },
        usePagination
    );

    const {pageIndex, pageSize} = state;

    useEffect(() => {
        setSearchParams({page: pageIndex + 1, size: pageSize});
    }, [pageSize, pageIndex]);

    return (
        <>
            <div className="row">
                <div className="col">
                    <table className="table table-responsive" {...getTableProps()}>
                        <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group flex align-item-center">
                        <label className="mr-2 pb-0">Show</label>
                        <select defaultValue={pageSize} className="form-control form-select w-25 mx-3"
                                onChange={(e) => setPageSize(Number(e.target.value))}>
                            {selectOptions.map(option => <option key={option} value={option}>{option}</option>)}
                        </select>
                        <label className="pb-0">of {rows.length}</label></div>
                </div>
                <div className="col-md-6">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="Next"
                        onPageChange={(page) => {
                            gotoPage(page.selected);


                        }}
                        forcePage={pageIndex}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={2}
                        pageCount={pageCount}
                        previousLabel="Prev"
                        renderOnZeroPageCount={null}
                        className="pagination"
                        pageClassName="page-item"
                        activeClassName="active"
                        pageLinkClassName="page-link"

                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextLinkClassName="page-link"
                        nextClassName="page-item"

                        disabledClassName="disabled"
                    />
                </div>
            </div>
        </>
    )
}


export default Table;
