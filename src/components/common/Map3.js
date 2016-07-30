import React, {PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';
import LoadingDots from './LoadingDots';
import toastr from 'toastr';

class Map3 extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      waypoints: Object.assign({}, this.props.waypoints)
    };

    this.renderMap = this.renderMap.bind(this);
    
  }

  // componentDidUpdate(prevProps,  prevState) {
  //   toastr.success('componentDidMount - ' + this._mapElement);
  //   let myLatlng = new google.maps.LatLng(44.012077, -89.40526);
  //   let options = {
  //       zoom: 11,
  //       center: myLatlng,
  //       mapTypeId: google.maps.MapTypeId.TERRAIN
  //   }            
  //   this._map = new google.maps.Map(document.getElementById("map_canvas"), options);
  //   if (this.props.waypoints)
  //   {
  //     this.props.waypoints.map((wp) => 
  //     {
  //       toastr.success(wp.name)
  //       let marker = new google.maps.Marker({
  //           position: new google.maps.LatLng(wp.latitude, wp.longitude),
  //           map: this._map,
  //           title: wp.name
  //       });
        
  //     });
  //   }    

  //   //this._input.focus();
  // }

  renderMap(el)
  {
  }

  render() {
    // TODO TZ - remove debugging code.
    toastr.warning('Map3.render');
    //debugger;        
    return (
        <div id="map_canvas3" ref={(c) => this._mapElement = c}>
        {this.props.waypoints.length}
        </div>
    );
  }
}

export default Map3;
