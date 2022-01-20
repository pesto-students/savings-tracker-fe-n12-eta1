import ReactPaginate from 'react-paginate';

const Paginate = ({items, setPage}) => {

    console.log(items);

    const handlePageClick = (event) => {

        console.log(event);
        console.log(items.nextPage);
        setPage(items.nextPage);
        // setPage(event);
    };

    return (
        <>
            <nav aria-label="Page navigation example">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={items.totalPages}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className="pagination"
                    pageClassName="page-item"
                    activeClassName="active"
                    pageLinkClassName="page-link"
                    previousClassName="page-item page-link"
                    nextClassName="page-item page-link"


                />
            </nav>

        </>

    );
}

export default Paginate