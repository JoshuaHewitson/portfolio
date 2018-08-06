import React, { Component } from 'react';
import './App.css';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MyWork from './components/MyWork'
import Home from './components/Home'
import TopBar from './components/TopBar'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import {withRouter} from 'react-router-dom';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#033587'
    },
    secondary: {
      main: '#0363b3',
      light: '#86cdf5'
    }
  },
  status: {
    danger: 'orange',
  },
});

class App extends Component {

  constructor(){
     super();
     this.state = {}
   }

   componentWillMount(){
     this.setState({
       index: 0
     });
   }


   handleChangeIndex (index) {
     this.setState({
       index: index,
     });
   };

   dots (){
     var dots = [];
     if(window.location.pathname == '/Work'){
       for(var i = 0 ; i < 8 ; i++){
         if(i==this.state.index){
           dots.push(
             <IconButton onClick={this.handleChangeIndex.bind(this,i)}>
             <span type='button' style={{
               height: '8px',
               width: '8px',
               backgroundColor: '#000000',
               borderRadius: '50%',
               display: 'inlineBlock',
               marginLeft: '10px',
               marginRight: '10px'
             }}/>
             </IconButton>
           )
         } else {
           dots.push(
             <IconButton onClick={this.handleChangeIndex.bind(this,i)}>
             <span type='button' style={{
               height: '8px',
               width: '8px',
               backgroundColor: '#FFFFFF',
               border: 'solid black 1px',
               borderRadius: '50%',
               display: 'inlineBlock',
               marginLeft: '10px',
               marginRight: '10px'
             }}/>
             </IconButton>
           )
         }
       }
     }
     return(dots);
   }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <BrowserRouter>
            <div>
              <TopBar/>
              <Switch>
                  <Route path='/' exact component={Home}/>
                  <Route path='/Home' render={() => <Home/>}/>
                  <Route path='/Work' render={() => <MyWork index={this.state.index} handleChangeIndex = {this.handleChangeIndex.bind(this)}/>}/>
              </Switch>
              <div style={{position:'fixed',bottom:'0px',width:'100%',height:'8%'}}>
                <Toolbar>
                  <Grid container>
                  <Grid container sm={1}  alignItems='center' justify='flex-start'>
                    <Typography style={{color:"#000000"}}>
                      2018
                    </Typography>
                  </Grid>
                  <Grid container sm={10} justify='center'>
                    {this.dots()}
                  </Grid>
                  <Grid container sm={1} alignItems='center' justify='flex-end'>
                    <Typography style={{color:"#000000"}}>
                      X: 12.2 Y: 23.65
                    </Typography>
                  </Grid>
                  </Grid>
                </Toolbar>
              </div>
            </div>
          </BrowserRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
