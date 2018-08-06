import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import windowSize from 'react-window-size';
import clifton4thPoster from '../Media/clifton4thPoster.jpg'
import clifton4th from '../Media/clifton4th.png'
import posters from '../Media/postersDJI.png'
import trailerHike from '../Media/trailerHike.mp4'
import trailerClifton from '../Media/trailer2Clifton.mp4'
import Divider from '@material-ui/core/Divider';



class DJI extends Component {
  render() {
    return (
      <div>
      <Grid container spacing={32}>
        <Grid item sm={3}>
        <Typography style={{fontSize:'30px'}}>
          CAMPAIGN
        </Typography>
        <Typography variant='body2'>
          Brand: DJI
        </Typography>
         <Typography>
           <br/><br/>

           With the new Mavic air, your everyday adventures will feel like blockbusters.<br/><br/>
           With 4k video and cinematic aerial shots everything will be as exciting and overdramatic as a
           classic action movie. Your trip up signal hill deserves an airbrushed poster and a thrilling trailer.
           I have created a campaign centered around promoting the release of two movies: ‘The Hike up
           signal hill’ and ‘Journey to Clifton 4th’. Action movie style posters will be put up - outdoors at buss
           stops and indoors in malls. The titles, being specific to Cape Town, will be intriguing and hopefully
           generate questions and discussion around the movies.<br/><br/>

           <br/><br/>
           <br/><br/>
           Fine print on the posters reveals that they are actually advertising the new Mavic air, and points
           viewers to the DJI website.<br/><br/>

           I took the concept further, creating trailers for these movies, playing on classic action movie trailer
           themes. These are to be posted on youtube and played as youtube ads (just like normal movie
           trailers). The end of the trailers reveal the Mavic Air and a link points viewers to the website.
           Adapted versions of the posters will also be promoted as sponsored ads on Facebook and
           Instagram - which push viewers to watch the longer trailers on youtube.

         </Typography>
         </Grid>
         <Grid item sm={9}>
         <img src={clifton4th} style={{width:'100%',border:'solid rgba(0,0,0,0.1) 1px'}}/>
         <br/><br/>
         <br/><br/>
         <img src={posters} style={{width:'100%',border:'solid rgba(0,0,0,0.1) 1px'}}/>
         <br/><br/>
         <Grid container justify='center'>
          <div>
           <video style={{width:'100%',height:'auto'}} controls>
              <source src={trailerHike} type="video/mp4"/>
              Your browser does not support the video tag.
           </video>
           </div>
           <br/><br/>
           <Divider/>
           <br/><br/>
           <div>
           <video style={{width:'100%',height:'auto'}} controls>
              <source src={trailerClifton} type="video/mp4"/>
              Your browser does not support the video tag.
           </video>
           </div>
         </Grid>
         </Grid>
        </Grid>
      </div>
    );
  }
}

export default windowSize(DJI);
