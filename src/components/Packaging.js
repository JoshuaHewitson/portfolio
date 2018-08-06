import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import windowSize from 'react-window-size';
import screen1 from '../Media/screen1.png';
import RenderRed1 from '../Media/RenderRed1.png'
import RenderBottles from '../Media/RenderBottles.png'
import shinyEye from '../Media/ShinyEye2.mp4'
import Divider from '@material-ui/core/Divider';



class Packaging extends Component {
  render() {
    return (
      <div>
      <Grid container spacing={32}>
        <Grid item sm={3}>
         <Typography style={{fontSize:'30px'}}>
           PACKAGING
         </Typography>
         <Typography variant='body2'>
           Brand: Neuradust
         </Typography>
         <Typography>
          <br/><br/>
          <Typography variant='body2'>
            Brief:
          </Typography>
           Design new packaging and visual identity for a set of two products that will be ordered online and shipped.
           Focusing on user experience in unboxing.
           <br/>
           <br/>
           <Typography variant='body2'>
            Solution:
           </Typography>
           Neuradust Focus, a study pack of nootropic powder.
           <br/><br/>
           The packaging is layered, with an outer frosted plastic, and an inner coloured bottle.
           The colour of the bottle shines through the plastic. The word FOCUS is also visible,
           but as the bottle curves further away from the frosted plastic surface, it blurs.
           On the back of the inner bottles there are interesting famous equations, and explinations of them.
           <br/><br/>

         </Typography>
        </Grid>
        <Grid item sm={9}>
       <img src={RenderRed1} style={{width:'100%'}}/>
       <br/><br/>
       <img src={RenderBottles} style={{width:'100%'}}/>
       </Grid>
       </Grid>
      </div>
    );
  }
}

export default windowSize(Packaging);
