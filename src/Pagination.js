import React from 'react'

const Pagination = ({imgPerPage, totalImages, paginate}) => {

    const pageNumbers = [];

    for (let index = 1; index <= Math.ceil(totalImages/imgPerPage); index++) {
        pageNumbers.push(index);
    }

    return (

        <nav>
            <ul class="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} href="!#" className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}


export default Pagination