import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import windowSize from 'react-window-size';
import cover from '../Media/coverJustLikePaPa.png'
import extract from '../Media/extractCatalogue1.png'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';


class TopBar extends Component {

  changePath(path) {
    this.props.history.push(path);
  }

  render() {
    return (
      <div>
        <AppBar position='relative' style={{
          background:"#FFFFFF",
          boxShadow:'none',
          borderBottom: 'solid black 0.5px'
        }}>
          <Toolbar>
            <Button style={{color:"#000000",marginLeft:'5%'}} onClick={() => this.changePath('/Work') }>
              Work
            </Button>
            <Typography style={{color:"#000000"}}>
            ---------------
            </Typography>
            <Button style={{color:"#000000"}} onClick={() => this.changePath('/Work') }>
              About Me
            </Button>
            <div style={{flexGrow: 1}} />
          </Toolbar>
        </AppBar>
        <AppBar position='relative' style={{background:'#000000',width:'22%'}}>
          <Grid container style={{height:'100%'}}>
          <Grid container alignItems='center' justify='center'>
            <Typography style={{color:"#FFFFFF",fontSize:'2vw'}}>
              JOSHUA HEWITSON
            </Typography>
          </Grid>
          </Grid>
        </AppBar>
      </div>
    );
  }
}

export default withRouter(TopBar);
