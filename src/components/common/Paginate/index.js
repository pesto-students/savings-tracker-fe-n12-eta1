import { Pagination } from "react-bootstrap";
import ReactPaginate from 'react-paginate';

const Paginate = ({goals, setPage}) => {

    const handlePageClick = (event) => {

        console.log(goals.nextPage)
        setPage(goals.nextPage);
      };

    return (
        <>
        <nav aria-label="Page navigation example">
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={goals.totalPages}
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