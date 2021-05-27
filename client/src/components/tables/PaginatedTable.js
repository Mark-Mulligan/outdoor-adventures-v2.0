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
import TablePagination from './TablePagination';

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

const PaginatedTable = () => {
  const classes = useStyles();

  const [parkData, setParkData] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [entryStart, setEntryStart] = useState(0);
  const [entryEnd, setEntryEnd] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getParksData(1, 10);
  }, []);

  const setTableData = (data) => {
    setParkData(data.results);
    setTotalResults(data.totalResults);
    setEntryStart(data.dataStart);
    setEntryEnd(data.dataEnd);
    setTotalPages(data.totalPages);
    setCurrentPage(data.currentPage);
  };

  const getParksData = async (page, limit) => {
    try {
      const { data, status } = await axios.get(`/api/parks/test?page=${page}&limit=${limit}`);
      if (status === 200) {
        console.log(data);
        setTableData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container-fluid parks-table-container">
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
          getParksData={getParksData}
        />
      </TableContainer>
    </div>
  );
};

export default PaginatedTable;
