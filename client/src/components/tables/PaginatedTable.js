import { useEffect, useState, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select';

import TablePagination from './TablePagination';
import { stateList, designationList, debounceFunction } from '../../util/util';

import './PaginatedTable.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    color: 'rgb(255, 255, 255)',
    fontSize: '1rem',
    padding: '11px',
  },
  body: {
    fontSize: '1rem',
    padding: '9px',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'rgba(225, 225, 225, 0.9)',
    },
    '&:nth-of-type(even)': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  tableContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  tableRow: {
    '&:hover': {
      backgroundColor: 'rgba(180, 180, 180, 0.9)',
      cursor: 'pointer',
    },
  },
});

const PaginatedTable = ({ history }) => {
  const classes = useStyles();

  const [designations, setDesignations] = useState([]);
  const [states, setStates] = useState([]);
  const [parkName, setParkName] = useState('');
  const [debouncedParkName, setDebouncedParkName] = useState('');

  const [parkData, setParkData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [entryStart, setEntryStart] = useState(0);
  const [entryEnd, setEntryEnd] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultLimit, setResultLimit] = useState(10);

  const getParksData = useCallback(async (page, limit, states, designation, parkQuery) => {
    let apiRequestStr = `/api/parks?page=${page}&limit=${limit}`;

    if (states.length > 0) {
      apiRequestStr += `&states=${states.join(',')}`;
    }

    if (designation.length > 0) {
      apiRequestStr += `&designation=${designation.join(',')}`;
    }

    if (parkQuery) {
      apiRequestStr += `&q=${parkQuery}`;
    }

    try {
      const { data, status } = await axios.get(apiRequestStr);
      if (status === 200) {
        setTableData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const setTableData = (data) => {
    setParkData(data.results);
    setTotalResults(data.totalResults);
    setEntryStart(data.dataStart);
    setEntryEnd(data.dataEnd);
    setTotalPages(data.totalPages);
    //setCurrentPage(data.currentPage);
  };

  useEffect(() => {
    getParksData(currentPage, resultLimit, states, designations, debouncedParkName);
  }, [states, designations, debouncedParkName, getParksData, resultLimit, currentPage]);

  const debouncedSearch = useMemo(
    () =>
      debounceFunction((val) => {
        Promise.resolve().then((res) => {
          ReactDOM.unstable_batchedUpdates(() => {
            setCurrentPage(1);
            setDebouncedParkName(val);
          });
        });
      }, 750),
    [setDebouncedParkName, setCurrentPage],
  );

  const onInputChange = useCallback(
    (e) => {
      setParkName(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch],
  );

  const onStateSelectChange = (inputData) => {
    const result = [];
    if (inputData.length >= 1) {
      inputData.forEach((item) => {
        result.push(item.value);
      });
    }
    setCurrentPage(1);
    setStates(result);
  };

  const onDesignationSelectChange = (inputData) => {
    const result = [];
    if (inputData.length >= 1) {
      inputData.forEach((item) => {
        result.push(item.value);
      });
    }
    setCurrentPage(1);
    setDesignations(result);
  };

  const onTableRowClick = (parkcode) => {
    history.push(`/parks/${parkcode}`);
  };

  return (
    <div className="container-fluid parks-table-container">
      <div className="container-fluid search-container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Search National Parks</h1>
          </div>
          <div className="col-md-4 col-12 mb-4">
            <label htmlFor="parkname-input" className="visually-hidden">
              Park Name
            </label>
            <input
              value={parkName}
              onChange={onInputChange}
              type="text"
              className="form-control parkname-input"
              id="parkname-input"
              aria-describedby="parkname"
              placeholder="Search by park name"
            />
          </div>
          <div className="col-md-4 col-12 mb-4">
            <label htmlFor="states-select" className="visually-hidden">
              States Filter
            </label>
            <Select
              name="states-select"
              placeholder="Filter by State(s)"
              options={stateList}
              isMulti
              onChange={onStateSelectChange}
            />
          </div>
          <div className="col-md-4 col-12 mb-4">
            <label htmlFor="designation-select" className="visually-hidden">
              Designation Filters
            </label>
            <Select
              name="designation-select"
              placeholder="Filter by Deisgnation(s)"
              options={designationList}
              isMulti
              onChange={onDesignationSelectChange}
            />
          </div>
        </div>
      </div>

      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Park Code</StyledTableCell>
              <StyledTableCell align="right">States</StyledTableCell>
              <StyledTableCell align="right">Designation</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parkData.length > 0 &&
              parkData.map((park) => (
                <StyledTableRow
                  key={park.parkcode}
                  className={classes.tableRow}
                  onClick={() => onTableRowClick(park.parkcode)}
                >
                  <StyledTableCell component="th" scope="row">
                    {park.fullname}
                  </StyledTableCell>
                  <StyledTableCell align="right">{park.parkcode}</StyledTableCell>
                  <StyledTableCell align="right">{park.states}</StyledTableCell>
                  <StyledTableCell align="right">{park.designation}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          entryStart={entryStart}
          entryEnd={entryEnd}
          totalResults={totalResults}
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          resultLimit={resultLimit}
          setResultLimit={setResultLimit}
        />
      </TableContainer>
    </div>
  );
};

export default PaginatedTable;
