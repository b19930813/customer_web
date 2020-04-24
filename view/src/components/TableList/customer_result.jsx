import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    form: {

    },
    text: {
        marginRight: '1%',
        marginBottom: '1%',
        width: '20%'
    }
}));

export default function CustomerResult(props) {
    const classes = useStyles();
    const [customer,setCustomer] = React.useState({
        acceptNews:false,
        company:'',
        englishName:'',
        extension:'',
        fax:'',
        id:0,
        jobTitle:'',
        mail1:'',
        mail2:'',
        mobile:'',
        name:'',
        tel:''
    });

    React.useEffect(()=>{
        if(props.props){
            setCustomer(props.props);
        }
    },[props])

    return (
        <Box component="span">
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    className={classes.text}
                    id="no"
                    label="客戶編號"
                    value= {customer.id || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="company"
                    label="所屬公司"
                    value= {customer.company || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="name"
                    label="聯絡人"
                    value= {customer.name || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="englishName"
                    label="聯絡人英文名"
                    value= {customer.englishName || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="jobTitle"
                    label="聯絡人職稱"
                    value= {customer.jobTitle || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="tel"
                    label="聯絡人電話"
                    value= {customer.tel || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="extension"
                    label="聯絡人分機"
                    value= { customer.extension || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="fax"
                    label="聯絡人傳真"
                    value= { customer.fax || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="mobile"
                    label="聯絡人行動電話"
                    value= { customer.mobile || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="mail1"
                    label="郵件信箱1"
                    value= { customer.mail1 || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="mail2"
                    label="郵件信箱2"
                    value= { customer.mail2 || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="acceptNews"
                    label="接受電子報"
                    value= { customer.acceptNews || ''}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </form>
        </Box>
    );
}
