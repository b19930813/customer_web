import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Content from './content'

const useStyles = makeStyles(theme => ({
    root: {
        width: '49%',
 
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function CompanySearch(props) {
    const classes = useStyles();
    
    // React.useEffect(() => {
    //   console.log(props.props)
    
    //   }, []);

    return (
        <div className={classes.root} style = {{"display":"inline-block"}}>

            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style = {{"background":"#00CACA"}}
                >

                    <Typography className={classes.heading}>公司查詢</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails  style = {{"background":"#F0F0F0"}}>
                    <Content props = {props.props}/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}