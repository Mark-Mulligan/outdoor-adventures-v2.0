import { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import SearchFilters from '../inputs/SearchFilters';
import TablePagination from './TablePagination';

import './PaginatedTable.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    color: 'rgb(255, 255, 255)',
    fontSize: '1rem',
  },
  body: {
    fontSize: '1rem',
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
});

const stateList = [
  { name: 'Texas', id: 'tx' },
  { name: 'Florida', id: 'fl' },
  { name: 'New Mexico', id: 'nm' },
  { name: 'Oklahoma', id: 'ok' },
  { name: 'Utah', id: 'ut' },
  { name: 'Nevada', id: 'nv' },
];
const designationList = [
  'national park',
  'national historical park',
  'national monument',
  'national historic trail',
  'national historic area',
  'national historic site',
  'national battefield',
  'park',
  'national memorial',
  'national seashore',
];

const debounceFunction = (func, delay) => {
  let timer;
  return function () {
    let self = this;
    let args = arguments;
    console.log(arguments);
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(self, args);
    }, delay);
  };
};

const PaginatedTable = () => {
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

  const getParksData = useCallback(async (page, limit, states, designation, parkName) => {
    let apiRequestStr = `/api/parks/test?page=${page}&limit=${limit}`;

    if (states.length > 0) {
      apiRequestStr += `&states=${states.join(',')}`;
    }

    if (designation.length > 0) {
      apiRequestStr += `&designation=${designation.join(',')}`;
    }

    if (parkName) {
      apiRequestStr += `&q=${parkName}`;
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
    setCurrentPage(data.currentPage);
  };

  useEffect(() => {
    getParksData(currentPage, resultLimit, states, designations, debouncedParkName);
  }, [states, designations, debouncedParkName, getParksData, resultLimit, currentPage]);

  const debouncedSearch = useMemo(
    () =>
      debounceFunction((val) => {
        setDebouncedParkName(val);
      }, 750),
    [setDebouncedParkName],
  );

  const onInputChange = useCallback(
    (e) => {
      setParkName(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch],
  );

  return (
    <div className="container-fluid parks-table-container">
      <div className="row">
        <div className="col-md-4 col-12 mb-4">
          <label htmlFor="parkname-input">Park Name</label>
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
          <label htmlFor="states-select">States Filter</label>
          <SearchFilters id="states-select" options={stateList} handleChange={setStates} placeholder="States Filter" />
        </div>
        <div className="col-md-4 col-12 mb-4">
          <label htmlFor="designation-select">Designation Filters</label>
          <SearchFilters
            id="designation-select"
            options={designationList}
            isObject={false}
            handleChange={setDesignations}
            placeholder="Designation Filter"
          />
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
                <StyledTableRow key={park.parkcode}>
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
