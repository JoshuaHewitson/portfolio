import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import windowSize from 'react-window-size';
import cover from '../Media/coverJustLikePaPa.png'
import extract from '../Media/extractCatalogue1.png'

class Catalogue extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={32}>
          <Grid item sm={3}>
           <Typography style={{fontSize:'30px'}}>
             CATALOGUE
           </Typography>
           <Typography variant='body2'>
             Brand: Just Like Pa Pa
           </Typography>
           <Typography>
             <br/><br/>
             <Typography variant='body2'>
              Brief:
             </Typography>
              Design a seasonal cataloge which caches the attention of a young Cape Town audience.
              <br/>
              <br/>
              <Typography variant='body2'>
               Solution:
              </Typography>
              A digital sumer cataloge, with a live connection to instagram.
              <br/><br/>
              What could be a better pairing with modern, beautifully designed products from an authentic local brand,
              than the realtime adventures of capetonians all around the City?
              <br/><br/>
              I had the idea that it would be interesting to discover the most instagrammed places around Cape Town.
              It would not only be a good way to see which places capetonians love, but more than that,
              it could generate a map of the most aesthetic local areas by popular vote.
              </Typography>
         </Grid>
         <Grid item sm={9}>
           <img src={cover} style={{width:'100%'}}/>
           <br/><br/><br/>
           <br/><br/><br/>
           <br/><br/><br/>
         </Grid>
        </Grid>

        <Grid container spacing={32}>
          <Grid item sm={9}>
            <Typography variant='caption'>
              Extract:
            </Typography>
            <img src={extract} style={{width:'100%',border:'solid rgba(0,0,0,0.1) 1px'}}/>
          </Grid>
          <Grid item sm={3}>
            <Typography>
              <br/>
              First I wrote code to pull thousands of geoLocation tags from local Instagram posts.
              Then linked them into Google Maps and created a temperature map.
              <br/><br/>
              After pulling images from the Instagram API, I thought of sorting them in other ways. Most importantly by Hue.
              <br/><br/>
              This, along with searching for certain common tags, allows me to algorithmically pull aesthetically pleasing images,
              populating a grid in the catalog with fresh - realtime images taken by authentic capetonians.
           </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default windowSize(Catalogue);
