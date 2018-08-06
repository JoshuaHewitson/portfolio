import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import windowSize from 'react-window-size';
import screen1 from '../Media/screen1.png';
import archeType1 from '../Media/archeType1.png'
import shinyEye from '../Media/ShinyEye2.mp4'
import Divider from '@material-ui/core/Divider';



class Archetype extends Component {
  render() {
    return (
      <div>
      <Grid container spacing={32}>
        <Grid item sm={3}>
       <Typography style={{fontSize:'30px'}}>
         CORPORATE IDENTITY
       </Typography>
       <Typography variant='body2'>
         Brand: Just Like Pa Pa
       </Typography>
       <Typography>
       <br/><br/>
       <Typography variant='body2'>
         Brief:
       </Typography>
          To create a logo and brand identity to reboot a vintage product in 2018.
          <br/><br/>
          <Typography variant='body2'>
            Solution:
          </Typography>
          Archetype - fully functional type writers, which can wirelessly connect to your laptop or smartphone.
       </Typography>
       </Grid>
       <Grid item sm={9}>
       <img src={archeType1} style={{width:'100%',border: 'solid rgba(0,0,0,0.1) 1px'}}/>
       <br/><br/>
       </Grid>
       </Grid>
      </div>
    );
  }
}

export default windowSize(Archetype);
