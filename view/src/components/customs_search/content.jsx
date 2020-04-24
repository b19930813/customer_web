import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
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

  const [custom, setCustom] = React.useState({
    name: '',
    tel: '',
    mobile: '',
    EnglishName: '',
    mail: ''
  })

  const handleNameChange = event => {
    event.persist();
    setCustom(oldValues => ({
      ...oldValues,
      name: event.target.value
    }))
    pushAPI();
  }

  const handleTelChange = event => {
    event.persist();
    setCustom(oldValues => ({
      ...oldValues,
      tel: event.target.value
    }))
    pushAPI();
  }

  const handleMobileChange = event => {
    event.persist();
    setCustom(oldValues => ({
      ...oldValues,
      mobile: event.target.value
    }))
    pushAPI();
  }

  const handleEnglishNameChange = event => {
    event.persist();
    setCustom(oldValues => ({
      ...oldValues,
      EnglishName: event.target.value
    }))
    pushAPI();
  }

  const handleMailChange = event => {
    event.persist();
    setCustom(oldValues => ({
      ...oldValues,
      mail: event.target.value
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
        <TextField id="name" label="聯絡人" style={{ "width": "40%" }} onChange={handleNameChange} />
        <TextField id="tel" label="聯絡人電話" style={{ "width": "40%" }} onChange={handleTelChange} />
        <TextField id="mobile" label="聯絡人行動電話" style={{ "width": "40%" }} onChange={handleMobileChange} />
        <TextField id="EnglishName" label="聯絡人英文名" style={{ "width": "40%" }} onChange={handleEnglishNameChange} />
        <TextField id="mail" label="郵件信箱" style={{ "width": "40%" }} onChange={handleMailChange} />
      </div>
    </form>
  );
}
