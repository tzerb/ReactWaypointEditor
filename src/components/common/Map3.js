import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';
import toastr from 'toastr';

class Map3 extends React.Component {
  constructor(props, context) {
    super(props, context);

    debugger;
    this.state = {
      waypoints: Object.assign({}, this.props.waypoints)
    };
    
  }

    componentWillReceiveProps(nextProps) {
        toastr.warning('componentWillReceiveProps');
        //alert('componentWillReceiveProps');
    }
  render() {
    // TODO TZ - remove debugging code.
    toastr.warning('render');
        
    return (
        <div id="map_canvas3">Map goes here</div>
    );
  }
}

export default Map3;
