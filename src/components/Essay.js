import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import windowSize from 'react-window-size';
import essay1 from '../Media/essay1.png'
import Divider from '@material-ui/core/Divider';



class Packaging extends Component {
  render() {
    return (
      <div>
      <Grid container spacing={32}>
        <Grid item sm={3}>
         <Typography style={{fontSize:'30px'}}>
           ESSAY
         </Typography>
         <Typography>
          <br/><br/>
          <Typography variant='body2'>
            Brief:
          </Typography>
           Write an essay in response to the article, The Algorithms of Our Lives, by Lev Manovich. Present the essay in a way which supports your idea
           <br/>
           <br/>
           <Typography variant='body2'>
            Problem:
           </Typography>
           How do we understand software systems as new media? How do we model and critique them as artwork?
           <br/><br/>
           <Typography variant='body2'>
            Solution:
           </Typography>
           Create an interactive software system, wich generates different essays based on user input.
           The main question being: is the resultant essay an artwork in itself, or is the whole system the artwork? 
           <br/><br/>
         </Typography>
        </Grid>
        <Grid item sm={9}>
       <img src={essay1} style={{width:'100%',border: 'solid rgba(0,0,0,0.1) 1px'}}/>
       <br/><br/>
       </Grid>
       </Grid>
      </div>
    );
  }
}

export default windowSize(Packaging);
