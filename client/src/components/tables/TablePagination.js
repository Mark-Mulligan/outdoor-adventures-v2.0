import './TablePagination.css';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const TablePagination = ({ entryStart, entryEnd, totalResults, totalPages, currentPage, getParksData }) => {
  return (
    <div className="pagination-section">
      <div className="pagination-info-container">
        Showing {entryStart} to {entryEnd} of {totalResults} results
        <IconButton
          onClick={() => getParksData(currentPage - 1, 10)}
          aria-label="previous-page"
          disabled={currentPage === 1 ? true : false}
        >
          <ChevronLeftIcon />
        </IconButton>
        <IconButton
          onClick={() => getParksData(currentPage + 1, 10)}
          aria-label="next-page"
          disabled={currentPage === totalPages ? true : false}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
      <div className="page-btns-container">
        {Array.from(Array(totalPages)).map((x, index) =>
          index + 1 === currentPage ? (
            <button className="page-btn active-page">{index + 1}</button>
          ) : (
            <button onClick={() => getParksData(index + 1, 10)} className="page-btn not-active" key={index}>
              {index + 1}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default TablePagination;
