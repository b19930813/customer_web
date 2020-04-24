import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
    textField: {
      width: 100,
    }
  },
}));

export default function Content(props) {
  const classes = useStyles();

  React.useEffect(() => {
    if(props.props){
    }
    else{
    }   
    }, [props.props]);

  const [company, setCompany] = React.useState({
    name: '',
    tel: '',
    no: '',
    EnglishName: '',
    address: ''
  })

  const handleTextChange = event =>{
    event.persist();
    setCompany(oldValues => ({
      ...oldValues,
      [event.target.id]:event.target.value
    }))
    pushAPI();
  }


  function pushAPI() {
    if (props.props) {
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField id="name" label="公司名稱" style={{ "width": "40%" }} onChange={handleTextChange} />
        <TextField id="tel" label="公司電話" style={{ "width": "40%" }} onChange={handleTextChange} />
        <TextField id="no" label="統一編號" style={{ "width": "40%" }} onChange={handleTextChange} />
        <TextField id="EnglishName" label="公司英文名" style={{ "width": "40%" }} onChange={handleTextChange} />
        <TextField id="address" label="公司地址" style={{ "width": "40%" }} onChange={handleTextChange} />
      </div>
    </form>
  );
}
