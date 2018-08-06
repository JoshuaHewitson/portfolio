import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import windowSize from 'react-window-size';
import render1 from '../Media/popupRender1.png'
import popupClose from '../Media/popupClose.png'
import popupVid from '../Media/popupVid.mp4'
import Divider from '@material-ui/core/Divider';



class PopUp extends Component {
  render() {
    return (
      <div>
      <Grid container spacing={32}>
        <Grid item sm={3}>
         <Typography style={{fontSize:'30px'}}>
           POP UP SHOP
         </Typography>
         <Typography variant='body2'>
           Brand: Stash
         </Typography>
         <Typography>
           <br/><br/>

           <Typography variant='body2'>
             Brief:
           </Typography>
           Create a popup store for Stash that will stand out in outdoor locations around Cape Town.
           <br/><br/>
           <Typography variant='body2'>
             Problem:
           </Typography>
            Many young people don’t know how Stash works – as soon as they hear it’s about investing, they think it’s complicated and are put off.
            <br/><br/>
            <Typography variant='body2'>
              Solution:
            </Typography>
            ‘The Coin Wall’ popup shop – an interactive experience with five touch points which draw attention and explains the app in an interesting way.
            The main feature being a massive smart phone, with a screen made up of coins. The Coins have a green side, a white side and are against a black background.
            By rotating the coins to specific angles, each ‘pixel’ in the screen can display white, green, black and many shades in-between.



         </Typography>
         </Grid>
         <Grid item sm={9}>
         <img src={render1} style={{width:'100%'}}/>
         <br/><br/><br/>
         <img src={popupClose} style={{width:'100%'}}/>
         <video style={{width:'100%',height:'auto'}} controls>
            <source src={popupVid} type="video/mp4"/>
            Your browser does not support the video tag.
         </video>
         <br/><br/>
         <Divider/>
         </Grid>
         </Grid>
      </div>
    );
  }
}

export default windowSize(PopUp);
