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
    marginTop: '2%',
    marginLeft: '2%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function CustomsSearch(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} style = {{"display":"inline-block"}}>
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style = {{"background":"#4EFEB3"}}
        >
        
          <Typography className={classes.heading}>聯絡人查詢</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style = {{"background":"#F0F0F0"}}>
          <Content props = {props.props}/>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}