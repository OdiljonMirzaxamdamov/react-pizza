import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage } from "../../redux/slices/filterSlice";
import { RootState } from "../../redux/store";


const Pagination: React.FC = () => {
    const dispatch = useDispatch()
    const currentPage = useSelector((state: RootState) => state.filter.currentPage)

    return (
        <>
            <ReactPaginate
                className={styles.root}
                breakLabel="..."
                nextLabel="next >"
                onPageChange={event => dispatch(setCurrentPage(event.selected + 1))}
                pageRangeDisplayed={4}
                pageCount={3}
                forcePage={currentPage - 1}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
            />
        </>
    )
}

export default Pagination;


