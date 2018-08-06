import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import Catalogue from './Catalogue';
import DJI from './DJI';
import Packaging from './Packaging';
import PopUp from './PopUp';
import Animation from './Animation';
import Archetype from './Archetype';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import threeEntryPoint from './threeEntryPoint';
import threeEntryPoint3 from './threeEntryPoint3';
import windowSize from 'react-window-size';
import "./home.css"
import Toolbar from '@material-ui/core/Toolbar';

//import reactionDiffusion from '../grayscott/index.html';



class Home extends Component {

  constructor(){
    super();
    this.state = {}
  }

  componentWillMount(){
    this.setState({width: this.props.windowWidth});
  }

  componentDidMount(){
    //threeEntryPoint(this.threeRootElement);
  }
  //<div ref={element => this.threeRootElement = element} style={{width:'500px',height:'500px'}} /> (in return)
  //<iframe src="https://pmneila.github.io/jsexp/grayscott/" style={{width:`${this.props.windowWidth}px`,height:`${this.props.windowHeight}px`}}></iframe>


  render() {

    return (
      <div>
      <Grid container justify='center' alignitems='center' style={{marginTop:'0px'}}>
        <Grid container justify='center' alignitems='center'>
          <div style={{}}>
            <iframe src='http://18.220.213.216/grayscott/index.html' style={{
              width:`${this.props.windowWidth/18 *17}px`,
              height:`${this.props.windowHeight/40 *31}px`,
              border:'solid black 1px',
              overflow: 'hidden'
            }}></iframe>
          </div>
        </Grid>
      </Grid>
      </div>
    );
  }
}

export default windowSize(Home);
