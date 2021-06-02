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
    <div
      className={`pagination-section container-fluid ${
        (entryEnd - entryStart) % 2 === 0 ? 'white-background' : 'light-grey-background'
      }`}
    >
      <div className="row pt-2 pb-2">
        <div className="col-lg-4 col-sm-6 col-12 d-flex align-items-center">
          Showing {entryStart} to {entryEnd} of {totalResults} results
        </div>
        <div className="results-per-page col-lg-4 col-sm-6 col-12 d-flex align-items-center">
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
        <div className="page-btns-container col-lg-4 col-12 d-flex align-items-center">
          <PageSelect totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
