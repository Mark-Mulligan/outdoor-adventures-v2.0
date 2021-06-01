import { useState, useEffect, useCallback } from 'react';

const PageSelect = ({ totalPages, currentPage }) => {
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

  return {};
};

export default PageSelect;
