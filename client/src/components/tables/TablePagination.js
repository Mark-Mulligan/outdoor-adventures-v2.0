import './TablePagination.css';

const TablePagination = ({ entryStart, entryEnd, totalResults, totalPages, currentPage, getParksData }) => {
  return (
    <div>
      <div>
        Showing {entryStart} to {entryEnd} of {totalResults} results
      </div>
      <div>
        {Array.from(Array(totalPages)).map((x, index) => (
          <div
            onClick={() => getParksData(index + 1, 10)}
            className={`page-btn ${index + 1 === currentPage && 'active-page'}`}
            key={index}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablePagination;
