import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SwipeableViews from 'react-swipeable-views';
import Catalogue from './Catalogue';
import WorkPage from './WorkPage';
import DJI from './DJI';
import Packaging from './Packaging';
import PopUp from './PopUp';
import DataVisualization from './DataVisualization';
import Animation from './Animation';
import Archetype from './Archetype';
import Essay from './Essay';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';

class MyWork extends Component {


  componentWillMount(){
  }

  handleBack = () => {
    if(this.props.index > 0){
      this.props.handleChangeIndex(this.props.index-1)
    }
  };

  handleForward = () => {
    if(this.props.index < 7){
      this.props.handleChangeIndex(this.props.index+1)
    }
  };

  render() {
    return (
      <div className="MyWork">
        <Grid container>
            <Grid container sm={1} justify='center' alignItems='center'>
              <Grid item>
              <Button variant="fab" aria-label="Add" onClick={this.handleBack}>
                <i class="material-icons">
                  arrow_back_ios
                </i>
              </Button>
              </Grid>
            </Grid>
            <Grid item sm={10}>
              <SwipeableViews
                index={this.props.index}
              >
                <WorkPage>
                  <Catalogue/>
                </WorkPage>
                <WorkPage>
                  <DJI/>
                </WorkPage>
                <WorkPage>
                  <DataVisualization/>
                </WorkPage>
                <WorkPage>
                  <PopUp/>
                </WorkPage>
                <WorkPage>
                  <Animation/>
                </WorkPage>
                <WorkPage>
                  <Packaging/>
                </WorkPage>
                <WorkPage>
                  <Archetype/>
                </WorkPage>
                <WorkPage>
                  <Essay/>
                </WorkPage>
              </SwipeableViews>
            </Grid>
            <Grid container sm={1} justify='center' alignItems='center'>
              <Grid item>
                <Button variant="fab" aria-label="Add" onClick={this.handleForward}>
                  <i class="material-icons">
                    arrow_forward_ios
                  </i>
                </Button>
              </Grid>
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default MyWork;
