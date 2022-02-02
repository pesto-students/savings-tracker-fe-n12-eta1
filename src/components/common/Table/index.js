import React, {useEffect} from 'react'
import {useTable, usePagination, useSortBy, useGlobalFilter} from 'react-table'
import ReactPaginate from "react-paginate";
import {useSearchParams} from 'react-router-dom';
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/outline";
import SearchForm from "./SearchForm";


function getInitialPageIndex(searchParams) {
    let page = searchParams.get('page');

    if (!page || isNaN(page)) {
        return 0;
    }

    return Number(page) - 1;
}

function getInitialPageSize(searchParams) {
    const size = searchParams.get('size');

    if (!size || isNaN(size)) {
        return null
    }

    return Number(size);

}


const showSortIcons = (isSorted, isSortedDesc) => {

    let upIconClass = '', downIconClass = '';


    if (isSorted) {

        if (isSortedDesc) {
            downIconClass = 'text-black';
            upIconClass = 'text-black-50';
        } else {
            downIconClass = 'text-black-50';
            upIconClass = 'text-black';
        }

    } else {
        upIconClass = downIconClass = 'text-black-50';

    }

    return <span className="d-inline-flex flex-column ms-1">
        <ChevronUpIcon className={"icon-table " + upIconClass}/>
        <ChevronDownIcon className={"icon-table " + downIconClass}/>
    </span>
};

function Table({columns, data, defaultPageSize = 5, selectOptions = [5, 10, 50], filter = false}) {

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

        setGlobalFilter,

        gotoPage,
        pageCount,

        setPageSize


    } = useTable(
        {
            columns,
            data,
            sortTypes: {
                alphanumeric: (rowA, rowB, columnId, desc) => {
                    const valueA = rowA.values[columnId].toLowerCase();
                    const valueB = rowB.values[columnId].toLowerCase();
                    return valueB.localeCompare(valueA) > 0 ? -1 : 1;
                }
            },
            initialState: {
                pageIndex: getInitialPageIndex(searchParams),
                pageSize: getInitialPageSize(searchParams) || defaultPageSize
            },
            // disableGlobalFilter: !filter
        },
        useGlobalFilter,
        useSortBy,
        usePagination
    );


    const {pageIndex, pageSize, globalFilter} = state;

    useEffect(() => {
        setSearchParams({page: pageIndex + 1, size: pageSize});
    }, [pageSize, pageIndex]);

    return (
        <>
            <div className="row">
                <div className="col-12 mb-3">
                    <SearchForm onSubmit={setGlobalFilter} onKeyUp={setGlobalFilter}/>
                </div>
                <div className="col-12">
                    <div className="table-responsive">
                        <table className="table" {...getTableProps()}>
                            <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>

                                            <span className="d-flex align-items-center">
                                            {column.render('Header')}
                                                {column.disableSortBy || showSortIcons(column.isSorted, column.isSortedDesc)}
                                            </span>
                                        </th>
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
            </div>
            <div className="row">
                <div className="col-md-6">

                    <div
                        className="row mb-3 row-cols-auto g-3 align-items-center justify-content-center justify-content-md-start">
                        <label>Show</label>
                        <div className="col">
                            <select defaultValue={pageSize} className="form-control form-select"
                                    onChange={(e) => setPageSize(Number(e.target.value))}>
                                {selectOptions.map(option => <option key={option} value={option}>{option}</option>)}
                            </select>
                        </div>

                        <label className="pb-0">of {rows.length}</label></div>

                </div>
                <div className="col-md-6 d-sm-block d-flex justify-content-center justify-content-sm-end">
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
                        className="pagination "
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
