import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { config } from '../api/config'

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
    }
}));

export default function Content() {
    const classes = useStyles();
    const [company, setCompany] = React.useState({
        name: '',
        englishName: '',
        tel: '',
        fax: '',
        no: '',
        postalCode: '',
        address: '',
        website: '',
        attr: 0,
    })

    const handleClearClick = () => {
        let list = ['name', 'tel', 'no', 'englishName', 'address','fax','postalCode','website'];
        list.forEach(id => {
            document.getElementById(id).value = '';
            setCompany({ [id]: '' });
        })
    }

    const handleTextChange = event => {
        event.persist();
        setCompany(oldValues => ({
            ...oldValues,
            [event.target.id]: event.target.value
        }))
    }
    
    //bug, loss for label 
    const handleSubmitClcik = () => {
        //call API ， 暫定皆為新增成功
        axios.post('/api/Companies', company, config)
            .then(response => {
                alert("新增成功");
            })
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <div>
                    <TextField id="name" label="公司名稱" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="englishName" label="公司英文名" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="tel" label="公司電話" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="fax" label="傳真" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="no" label="統一編號" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="postalCode" label="郵遞區號" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="address" label="公司地址" style={{ "width": "40%" }} onChange={handleTextChange} />
                    <TextField id="website" label="公司網址" style={{ "width": "40%" }} onChange={handleTextChange} />
                </div>
                <div>
                    <Button className={classes.button} variant="contained" color="primary" onClick={handleClearClick}>
                        清空資訊
                    </Button>
                    <Button className={classes.button} variant="contained" color="primary" onClick={handleSubmitClcik}>
                        新增
                    </Button>
                </div>
            </div>
        </form>
    );
}
