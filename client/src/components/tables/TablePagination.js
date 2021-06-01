import './TablePagination.css';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const TablePagination = ({
  entryStart,
  entryEnd,
  totalResults,
  totalPages,
  currentPage,
  getParksData,
  states,
  designations,
  parkName,
  resultLimit,
  setResultLimit,
}) => {
  return (
    <div className="pagination-section">
      <div className="pagination-info-container">
        <div>
          Showing {entryStart} to {entryEnd} of {totalResults} results
          <IconButton
            onClick={() => getParksData(currentPage - 1, resultLimit, states, designations, parkName)}
            aria-label="previous-page"
            disabled={currentPage === 1 ? true : false}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={() => getParksData(currentPage + 1, resultLimit, states, designations, parkName)}
            aria-label="next-page"
            disabled={currentPage === totalPages ? true : false}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>

        <div className="results-per-page">
          <p>Results Per Page:</p>

          <FormControl className="paginated-select">
            <Select
              labelId="page-limit-select-label"
              id="page-limit-select"
              value={resultLimit}
              onChange={(e) => setResultLimit(e.target.value)}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="page-btns-container">
        {Array.from(Array(totalPages)).map((x, index) =>
          index + 1 === currentPage ? (
            <button className="page-btn active-page" key={index}>
              {index + 1}
            </button>
          ) : (
            <button
              onClick={() => getParksData(index + 1, resultLimit, states, designations, parkName)}
              className="page-btn not-active"
              key={index}
            >
              {index + 1}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default TablePagination;
