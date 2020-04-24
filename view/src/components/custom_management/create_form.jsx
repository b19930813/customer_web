import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
//Select 
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//Select end
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { config } from '../api/config'
//Checkbox & form controll labe;
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
    button: {
        marginTop: '2%',
        marginLeft: '2%',
    },
    formControl: {
        marginTop: '1.1%',
        marginLeft: '0.8%'
    }
}));

export default function Content() {
    const classes = useStyles();
    const [custom, setCustom] = React.useState({
        name: '',
        tel: '',
        mobile: '',
        englishName: '',
        mail: '',
        companyId: ''
    })
    const [company, setCompany] = React.useState([]);
    const [acceptAds,setAcceptAds] = React.useState(false);
    const [selectCompany, setSelectCompany] = React.useState('');
    //Get Company Data
    React.useEffect(() => {
        axios.get('/api/Companies', config)
            .then(response => {
                setCompany(response.data);
            })

        //front-end set data
        //setCompany({ id: 1, name: 'comapny1' });
    }, [])



    let list = company.map((item, index) =>
        <MenuItem key={index} value={item.id}>No.{item.id}:{item.name}</MenuItem>
    )

    const handleSelectChange = event => {
        setCustom(oldValues => ({
            ...oldValues,
            companyId: event.target.value
        }))
    }

    const handleClearClick = () => {
        let list = ['name','englishName','jobTitle','tel','extension','fax','mobile','mail1','mail2'];
        list.forEach(id => {
            document.getElementById(id).value = '';
            setCustom({ [id]: '' });
        })
        setSelectCompany('None');
        //test 用

    }
    
    const handleAcceptAdsCheck = () =>{
        setAcceptAds(!acceptAds);
    }

    const handleTextChange = event => {
        event.persist();
        setCustom(oldValues => ({
            ...oldValues,
            [event.target.id]: event.target.value
        }))
    }

    const handleSubmitClcik = () => {
        //call API
        axios.post('/api/Customs', custom, config)
            .then(response => {
                console.log(response);
            })
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <div>
                    <FormControl className={classes.formControl} style={{ "width": "40%" }}>
                        <InputLabel id="companyId_input">公司名稱</InputLabel>
                        <Select
                            labelId="companyId_label"
                            id="companyId"
                            value={custom.companyId}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {list}
                        </Select>
                    </FormControl>

                    <TextField id="name" label="聯絡人" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="englishName" label="聯絡人英文名" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="jobTitle" label="聯絡人職稱" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="tel" label="聯絡人電話" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="extension" label="聯絡人分機" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="fax" label="聯絡人傳真" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="mobile" label="聯絡人行動電話" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="mail1" label="郵件信箱1" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="mail2" label="郵件信箱2" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={acceptAds}
                                onChange={handleAcceptAdsCheck}
                                name="checkedAccept"
                                color="primary"
                            />
                        }
                        label="是否接收電子報"
                    />


                </div>
                <Button className={classes.button} variant="contained" color="primary" onClick={handleClearClick}>
                    清空資訊
               </Button>
                <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmitClcik}>
                    新增
                </Button>
            </div>
        </form>
    );
}
