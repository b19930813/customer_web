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

export default function CompanyResult(props) {
    const classes = useStyles();
    const [company,setCompany] = React.useState({
        name:'',
        englishName:'',
        tel:'',
        fax:'',
        no:'',
        map:'',
        address:'',
        website:'',
        attr:0
    })
    //const [company,setCompany] = React.useState(null);
    React.useEffect(()=>{
        if(props.props){
            setCompany(props.props)
        }
        //setCompany(props.props);
    },[props])

    return (
        <Box component="span">
            <form className={classes.form} noValidate autoComplete="off">
                <TextField
                    className={classes.text}
                    id="name"
                    label="公司名稱"
                    value={company.name || ""}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="englishName"
                    label="公司英文名稱"
                    value={company.englishName || ""}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="tel"
                    label="電話"
                    value={company.tel || ""}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="fax"
                    label="傳真"
                    value={company.fax || ""}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="no"
                    label="統一編號"
                    value={company.no || ""}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="map"
                    label="郵遞區號"
                    value={company.map || ""}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="address"
                    label="公司地址"
                    value={company.address || ""} 
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="website"
                    label="公司網址"
                    value={company.website || ""}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    className={classes.text}
                    id="attr"
                    label="客戶屬性"
                    value={company.attr || 0}
                    InputProps={{
                        readOnly: true,
                    }}
                />
            </form>
        </Box>
    );
}
