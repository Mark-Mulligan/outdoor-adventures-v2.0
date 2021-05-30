import { useEffect, useState } from 'react';
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
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  pageButton: {
    width: 30,
    display: 'inline-block',
    textAlign: 'center',
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

const PaginatedTable = () => {
  const classes = useStyles();

  const [designations, setDesignations] = useState([]);
  const [states, setStates] = useState([]);

  const [parkData, setParkData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [entryStart, setEntryStart] = useState(0);
  const [entryEnd, setEntryEnd] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getParksData(1, 10, states);
  }, [states]);

  const setTableData = (data) => {
    setParkData(data.results);
    setTotalResults(data.totalResults);
    setEntryStart(data.dataStart);
    setEntryEnd(data.dataEnd);
    setTotalPages(data.totalPages);
    setCurrentPage(data.currentPage);
  };

  const getParksData = async (page, limit, states) => {
    let apiRequestStr = `/api/parks/test?page=${page}&limit=${limit}`;

    if (states.length > 0) {
      apiRequestStr += `&states=${states.join(',')}`;
    }

    try {
      const { data, status } = await axios.get(apiRequestStr);
      if (status === 200) {
        setTableData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid parks-table-container">
      <div className="row">
        <div className="col mb-4">
          <label htmlFor="parkname-input">Park Name</label>
          <input
            type="email"
            className="form-control parkname-input"
            id="parkname-input"
            aria-describedby="parkname"
            placeholder="Search by park name"
          />
        </div>
        <div className="col">
          <label htmlFor="states-select">States Filter</label>
          <SearchFilters id="states-select" options={stateList} handleChange={setStates} />
        </div>
        <div className="col">
          <label htmlFor="designation-select">Designation Filters</label>
          <SearchFilters
            id="designation-select"
            options={designationList}
            isObject={false}
            handleChange={setDesignations}
          />
        </div>
      </div>
      <TableContainer component={Paper}>
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
          states={states}
          getParksData={getParksData}
        />
      </TableContainer>
    </div>
  );
};

export default PaginatedTable;
