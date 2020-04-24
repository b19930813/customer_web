import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Content from './create_form'

const useStyles = makeStyles(theme => ({
    root: {
       marginTop:'2%'
 
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function Create() {
    const classes = useStyles();

    return (
        <div className={classes.root} style = {{"display":"inline-block"}}>

            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >

                    <Typography className={classes.heading}>新增公司資料</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Content/>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
}