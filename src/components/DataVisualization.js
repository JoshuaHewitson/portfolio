import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import windowSize from 'react-window-size';
import dataVis from '../Media/dataVis.png'
import dataVis2 from '../Media/dataVis2.png'
import dataVis3 from '../Media/dataVis3.png'
import extract from '../Media/extractCatalogue1.png'

class Catalogue extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={32}>
          <Grid item sm={3}>
           <Typography style={{fontSize:'30px'}}>
             DATA VISUALIZATION
           </Typography>
           <Typography variant='body2'>
             Brand: Behance
           </Typography>
           <Typography>
             <br/><br/>
             <Typography variant='body2'>
              Brief:
             </Typography>
              Create an interesting and visually appealing representation of a multi variable system, while promoting a brand of your choice.
              <br/>
              <br/>
              <Typography variant='body2'>
               Problem:
              </Typography>
              Artistic media is hard to define or measure. Can we use complex data visualization to uncover more of the theory behind aesthetic appeal?
              <br/><br/>
              <Typography variant='body2'>
               Concept:
              </Typography>
              To promote Behance, I have created colour maps for artistic media, showing the distribution and connections of colours from thousands of examples pulled from the site.

              <br/><br/>
              <br/><br/>
              <br/><br/>
           </Typography>
         </Grid>
         <Grid item sm={9}>
           <img src={dataVis} style={{width:'100%'}}/>
           <br/><br/><br/>
           <br/><br/><br/>
         </Grid>
        </Grid>

        <Grid container spacing={32}>
          <Grid item sm={9}>
            <Typography variant='caption'>
              Extract:
            </Typography>
            <img src={dataVis2} style={{width:'100%',border:'solid rgba(0,0,0,0.1) 1px'}}/>
            <br/><br/><br/>
            <img src={dataVis3} style={{width:'100%',border:'solid rgba(0,0,0,0.1) 1px'}}/>
          </Grid>
          <Grid item sm={3}>
            <Typography>
              <br/>
              
           </Typography>
          </Grid>
        </Grid>


      </div>
    );
  }
}

export default windowSize(Catalogue);
