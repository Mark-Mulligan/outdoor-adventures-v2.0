import { useState, useEffect, useCallback } from 'react';
import './PageSelect.css';

const PageSelect = ({ totalPages, currentPage, setCurrentPage }) => {
  const [pageBtnValues, setPageBtnValues] = useState([]);

  const getPageBtnValues = useCallback(() => {
    if (totalPages > 7 && currentPage < 5) {
      setPageBtnValues([1, 2, 3, 4, 5, '...', totalPages]);
    } else if (totalPages > 7 && currentPage > totalPages - 4) {
      setPageBtnValues([1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]);
    } else if (totalPages > 7) {
      setPageBtnValues([1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]);
    } else {
      let result = [];
      for (let i = 1; i <= totalPages; i++) {
        result.push(i);
      }
      setPageBtnValues(result);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    getPageBtnValues();
  }, [totalPages, currentPage, getPageBtnValues]);

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
        <button className="page-link" aria-label="Previous" onClick={() => setCurrentPage(currentPage - 1)}>
          <span> &#60; </span>
          <span className="visually-hidden">Previous</span>
        </button>
      </li>
      {pageBtnValues.map((value, index) => {
        if (value === currentPage) {
          return (
            <li className="page-item active">
              <button className="page-link" key={index}>
                {value}
              </button>
            </li>
          );
        } else if (value === '...') {
          return (
            <li className="page-item disabled">
              <button className="page-link" key={index}>
                {value}
              </button>
            </li>
          );
        } else {
          return (
            <li className="page-item">
              <button onClick={() => setCurrentPage(value)} className="page-link" key={index}>
                {value}
              </button>
            </li>
          );
        }
      })}
      <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
        <button className="page-link" aria-label="next" onClick={() => setCurrentPage(currentPage + 1)}>
          <span> &#62; </span>
          <span className="visually-hidden">Next</span>
        </button>
      </li>
    </ul>
  );
};

export default PageSelect;
