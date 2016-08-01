import React, {PropTypes} from 'react';
import toastr from 'toastr';
import WaypointListRow from '../waypoints/WaypointListRow';
// import GoogleMapsLoader from 'google-maps';

const mapStyles = {
  content : {
    height                : '500px'
  }
};

class Map4 extends React.Component {
  constructor(props, context) {
    super(props, context);

    let center = null;

    try {

      center = new google.maps.LatLng(44.012077, -89.40526);
      this.hasMap = true;
    }
    catch(ex)
    {
      this.hasMap=false;
    }

    this.Markers = [];  
    this.state = {
      waypoints: Object.assign({}, this.props.waypoints),
      zoom: 6,
      center: center,
      hasMap : this.hasMap
    };

    this.renderMap = this.renderMap.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
  }

  componentDidMount(prevProps,  prevState) {
    toastr.success('componentDidMount - ' + this._mapElement);
    toastr.success('componentDidMount - zoom = ' + this.state.zoom);

    // GoogleMapsLoader.KEY = 'AIzaSyCG_KuXMd6mrgAzrRcgXr91Yr6Ed03VNaw';
    // GoogleMapsLoader.LIBRARIES = ['geometry', 'places', 'visualization'];    //geometry,places,visualization
    // GoogleMapsLoader.load(function(google) {

      try {

        if (this.hasMap)
        {
          let _this = this;
          let mapElement = document.getElementById("map_canvas");

          //let mapElement = this._mapElement;

          let options = {
              zoom: this.state.zoom,
              center: this.state.center
          };
          this._map = new google.maps.Map(mapElement, options);

          // var infowindow = new google.maps.InfoWindow({
          //   content: 'Change the zoom level',
          //   position: myLatlng
          // });
          // infowindow.open(map);

          this._map.addListener('zoom_changed', function() {
            _this.setState({zoom: _this._map.getZoom()});
          });

          this._map.addListener('dragend', function() {
            _this.setState({center: _this._map.getCenter()});
          });
    
          this.hasMap = true;
          this.addMarkers();
        }
        //this._mapElement.appendChild(mapElement);
      } catch(ex)
      {
        this.hasMap = false;
        toastr.error('componentDidMount - ' + ex);
      }
    // });
    
  }

  componentDidUpdate (prevProps, prevState)
  {
    toastr.success('componentDidUpdate');
    this.deleteMarkers();
    this.addMarkers();
  }

  addMarkers()
  {
      if (this.hasMap && this.props.waypoints)
      {
        this.props.waypoints.map((wp) => 
        {
          toastr.success(wp.name);
          let marker = new google.maps.Marker({
              position: new google.maps.LatLng(wp.latitude, wp.longitude),
              map: this._map,
              title: wp.name
          });
          this.Markers.push(marker);
        });
      }  
  }

  deleteMarkers()
  {
    for(let i = 0; i<this.Markers.length; i++)
    {
      this.Markers[i].setMap(null);
    }
  }

  buttonClicked() {
    this.setState({zoom: this.state.zoom+1});
  }

  renderMap(el)
  {
  }

  render() {
    // TODO TZ - remove debugging code.
    toastr.warning('Map3.render');
    //debugger;        
  return (
    <div>

    {this.props.waypoints===null &&
      <span>The list is null.</span>
    }

    {this.props.waypoints && (this.props.waypoints.length===0) &&
      <span>The list is empty.</span>
    }

      <div>Map4</div>

    {this.props.waypoints && (this.props.waypoints.length>0) &&
      <div>
      <table className="table">
        <thead>
        <tr>
          <th width="140"></th>
          <th>Title</th>
        </tr>
        </thead>
        <tbody>
          {this.props.waypoints.map(waypoint =>
            <WaypointListRow key={waypoint.waypointId} waypoint={waypoint} onEdit={this.props.onEdit} onDelete={this.props.onDelete}/>
          )} 
        </tbody>
      </table>
      <div width="200">{this.state.zoom}<br/>{'hasMap = ' + this.state.hasMap}</div><button onClick={this.buttonClicked}>zoom</button>
      <div id="map_canvas4" style={mapStyles} ref={(c) => this._mapElement = c}></div>
      </div>
    }

    </div>
  );
  }
}

Map4.propTypes = {
  waypoints: PropTypes.array.isRequired,
  onEdit: PropTypes.function,
  onDelete: PropTypes.function
};

export default Map4;
