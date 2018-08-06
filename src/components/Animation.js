import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import windowSize from 'react-window-size';
import screen1 from '../Media/screen1.png';
import popupClose from '../Media/popupClose.png'
import shinyEye from '../Media/ShinyEye2.mp4'
import Divider from '@material-ui/core/Divider';



class Animation extends Component {
  render() {
    return (
      <div>
      <Grid container spacing={32}>
        <Grid item sm={6}>
         <Typography style={{fontSize:'30px'}}>
           ANIMATION
         </Typography>
         <Typography>
           <Typography variant='body2'>
             Brief:
           </Typography>
           Create an animated music video for the song <br/> ‘from each shiny eye’ by the simon van Gend band.
           <br/><br/>
           </Typography>
       </Grid>
       <Grid item sm={6}>
       <br/><br/>
       </Grid>
       </Grid>
       <video style={{width:'100%',height:'auto'}} controls>
          <source src={shinyEye} type="video/mp4"/>
          Your browser does not support the video tag.
       </video>
      </div>
    );
  }
}

export default windowSize(Animation);
