import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import Button from '@material-ui/core/Button';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TabelArsip(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TabelArsip.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#ECECEC',
      color: '#000000',
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

const useStyles2 = makeStyles({
  table: {
    minWidth: 1000,
  },
});

export default function CustomPaginationActionsTable(props) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
            <TableRow>
                <StyledTableCell align="center">Praktikum</StyledTableCell>
                <StyledTableCell align="center">Judul Laporan</StyledTableCell>
                <StyledTableCell align="center">Nama Lembaga</StyledTableCell>
                <StyledTableCell align="center">Nama Mahasiswa</StyledTableCell>
                <StyledTableCell align="center">Periode</StyledTableCell>
                <StyledTableCell align="center">Supervisor Sekolah</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {(props.data
          ).map((row) => (
            <StyledTableRow>
              <StyledTableCell style={{ width: 30 }} align="center">
                {row.laporan_akhir.jenis_praktikum}
              </StyledTableCell>
              <StyledTableCell style={{ width: 160 }} align="center">
                {row.laporan_akhir.nama_laporan}
              </StyledTableCell>
              <StyledTableCell style={{ width: 160 }} align="center">
                {row.mahasiswa.supervisor_lembaga === null ? '' : row.mahasiswa.supervisor_lembaga.lembaga.nama}
              </StyledTableCell>
              <StyledTableCell style={{ width: 160 }} align="center">
                {row.mahasiswa.user.full_name}
              </StyledTableCell>
              <StyledTableCell style={{ width: 100 }} align="center">
                {row.mahasiswa.periode.nama}
              </StyledTableCell>
              <StyledTableCell style={{ width: 150 }} align="center">
                {row.mahasiswa.supervisor_sekolah.user.full_name}
              </StyledTableCell>
              <StyledTableCell style={{ width: 50 }} align="center">
                <Button
                    name='simpan-button'
                    variant="contained"
                    disableElevation>
                    Unduh
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}

          {emptyRows > 0 && (
            <StyledTableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={6} />
            </StyledTableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={props.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TabelArsip}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
