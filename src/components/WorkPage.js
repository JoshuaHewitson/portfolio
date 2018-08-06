import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import windowSize from 'react-window-size';

class Catalogue extends Component {
  render() {
    return (
      <div style={{padding:'5px'}}>
        <Paper className='paper' elevation={1} style={{
          marginTop:'1%',
          maxHeight:`${this.props.windowHeight/5 *4}px`,
          overflowY : 'scroll',textAlign:'left',
          boxShadow:'none',borderRadius:'1px',
          borderLeft:'solid black 0.5px'
        }}>
          <div style={{padding:'5%'}}>
            {this.props.children}
          </div>
        </Paper>
      </div>
    );
  }
}

export default windowSize(Catalogue);
