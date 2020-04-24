import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
//Expansion
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//show Company 
import CompanyResult from './company_result';
//show custom 
import CustomerResult from './customer_result';
import axios from 'axios';
import { config } from '../api/config'

//fake data

function createData(id, name, englishName, tel, fax, no, map, address, website, attr) {
  return { id, name, englishName, tel, fax, no, map, address, website, attr };
}

function createcustom(id,company, name, englishName, jobTitle, tel, extension, fax, mobile, mail1, mail2, acceptNews) {
  return { id, company, name, englishName, jobTitle, tel, extension, fax, mobile, mail1, mail2, acceptNews }
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const companyCells = [
  { id: 'name', numeric: false, disablePadding: true, label: '公司名稱' },
  { id: 'tel', numeric: true, disablePadding: false, label: '電話' },
  { id: 'address', numeric: true, disablePadding: false, label: '公司地址' },
];

const customCels = [
  { id: 'name', numeric: false, disablePadding: true, label: '聯絡人名稱' },
  { id: 'tel', numeric: true, disablePadding: false, label: '聯絡人電話' },
  { id: 'extension', numeric: true, disablePadding: false, label: '聯絡人分機' },
  { id: 'mobile', numeric: true, disablePadding: false, label: '聯絡人行動電話' },
  { id: 'mail', numeric: true, disablePadding: false, label: '郵件信箱' },
];

function EnhancedTableHeadCustom(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">

        </TableCell>
        {customCels.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">

        </TableCell>
        {companyCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

EnhancedTableHeadCustom.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle">
            {props.name}
          </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '2%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  expansion: {
    marginBottom: '5%'
  }
}));

export default function TableList(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [customPage, setCustomPage] = React.useState(0);
  const [companyPerPage, setcompanyPerPage] = React.useState(5);
  const [customPerPage, setCustomPerPage] = React.useState(5);
  //Create state company for row data
  const [company, setCompany] = React.useState([]);
  const [custom, setCustom] = React.useState([]);
  //Send single props to company rseult
  const [companyData, setCompanyData] = React.useState(null);
  const [customerData,setCustomerData] = React.useState(null);


  React.useEffect(() => {
    let temp = [];
    props.props.forEach(company => {
      temp.push(createData(company.id, company.name, company.englishName, company.tel, company.fax, company.no, company.map, company.address, company.website, company.attr));
    })
    setCompany(temp);
  }, [props])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = company.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name, id, index) => {
    setCompanyData(company[index])
    axios.get(`/api/Customs/findByCompany/${company[index].id}`, config)
      .then(response => {
        if (response.request.status == '200') {
            let temp = [];
            response.data.forEach(customer =>{
              temp.push(createcustom(customer.id,company[index].name,customer.name,customer.englishName,customer.jobTitle,customer.tel,customer.extension,customer.fax,customer.mobile,customer.mail1,customer.mail2,customer.acceptNews));
            })
            setCustom(temp);
        }
      })
  };

  const handleCustomerClick = (event,index) => {
    setCustomerData(custom[index]);
  }

  //company
  const handleChangeCompanyPage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeCustomerPage = (event, newPage) => {
    setCustomPage(newPage);
  }

  const handleChangeCompanyPerPage = event => {
    setcompanyPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeCustomerPerPage = event => {
    setCustomPerPage(parseInt(event.target.value, 10));
    setCustomPage(0);
  }

   //commit 
  const isSelected = name => selected.indexOf(name) !== -1;
  //const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const emptycompany = companyPerPage - Math.min(companyPerPage, company.length - page * companyPerPage);
  const emptycustom = customPerPage - Math.min(customPerPage, custom.length - customPage * customPerPage);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper} >
        <EnhancedTableToolbar numSelected={selected.length} name={"公司資料"} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
            
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={company.length}
            />
            <TableBody>
              {stableSort(company, getComparator(order, orderBy))
                .slice(page * companyPerPage, page * companyPerPage + companyPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.name, "company", index)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">

                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.tel}</TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                    </TableRow>
                  );
                })}
              {emptycompany > 0 && (
                <TableRow style={{ height: (53 * emptycompany) }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={company.length}
          rowsPerPage={companyPerPage}
          page={page}
          onChangePage={handleChangeCompanyPage}
          onChangeRowsPerPage={handleChangeCompanyPerPage}
        />
      </Paper>
      <div className={classes.expansion}>
        <ExpansionPanel >
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style = {{"background":"#00CACA"}}
          >

            <Typography className={classes.heading}>公司詳細資訊</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails   style = {{"background":"#F0F0F0"}}>
            <CompanyResult props={companyData} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      {/* 客戶List */}
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} name={"客戶資料"} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHeadCustom
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={company.length}
            />
            <TableBody>
              {stableSort(custom, getComparator(order, orderBy))
                .slice(page * companyPerPage, page * companyPerPage + companyPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleCustomerClick(event, index)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        {/* delete checkbox */}
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="1%" >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.tel}</TableCell>
                      <TableCell align="right">{row.extension}</TableCell>
                      <TableCell align="right">{row.mobile}</TableCell>
                      <TableCell align="right">{row.mail1}</TableCell>
                    </TableRow>
                  );
                })}
              {emptycompany > 0 && (
                <TableRow style={{ height: (53 * emptycompany) }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={company.length}
          rowsPerPage={companyPerPage}
          page={page}
          onChangePage={handleChangeCustomerPage}
          onChangeRowsPerPage={handleChangeCustomerPerPage}
        />
      </Paper>

      <div>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style = {{"background":"#4EFEB3"}}
          >

            <Typography className={classes.heading}>客戶詳細資訊</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style = {{"background":"#F0F0F0"}}>
            <CustomerResult props = {customerData}/>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
}
