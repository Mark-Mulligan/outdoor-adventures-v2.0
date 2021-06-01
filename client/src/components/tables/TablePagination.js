import './TablePagination.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import PageSelect from './PageSelect';

const TablePagination = ({
  entryStart,
  entryEnd,
  totalResults,
  totalPages,
  currentPage,
  setCurrentPage,
  resultLimit,
  setResultLimit,
}) => {
  const handleResultsPerPage = (e) => {
    setResultLimit(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="pagination-section container-fluid">
      <div className="row">
        <div className="col d-flex align-items-center">
          Showing {entryStart} to {entryEnd} of {totalResults} results
        </div>
        <div className="results-per-page col d-flex align-items-center justify-content-center">
          <p>Results Per Page:</p>

          <FormControl className="paginated-select">
            <Select
              labelId="page-limit-select-label"
              id="page-limit-select"
              value={resultLimit}
              onChange={handleResultsPerPage}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="page-btns-container col d-flex align-items-center justify-content-end">
          <PageSelect totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
