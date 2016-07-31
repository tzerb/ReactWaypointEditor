import React, {PropTypes} from 'react';
import toastr from 'toastr';
import WaypointListRow from '../waypoints/WaypointListRow';


const mapStyles = {
  content : {
    height                : '500px',
  }
}

class Map4 extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      waypoints: Object.assign({}, this.props.waypoints),
      zoom: 6,
      center: new google.maps.LatLng(44.012077, -89.40526)
    };

    this.renderMap = this.renderMap.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    
  }

  componentDidMount(prevProps,  prevState) {
    toastr.success('componentDidMount - ' + this._mapElement);
    toastr.success('componentDidMount - zoom = ' + this.state.zoom);

    try {
      let _this = this;
      let mapElement = document.getElementById("map_canvas");
      //let mapElement = this._mapElement;

      let myLatlng = new google.maps.LatLng(44.012077, -89.40526);
      let options = {
          zoom: this.state.zoom,
          center: this.state.center
      }   
      var map = new google.maps.Map(mapElement, options);

      // var infowindow = new google.maps.InfoWindow({
      //   content: 'Change the zoom level',
      //   position: myLatlng
      // });
      // infowindow.open(map);

      map.addListener('zoom_changed', function() {
        _this.setState({zoom: map.getZoom()});
      });

      map.addListener('dragend', function() {
        _this.setState({center: map.getCenter()});
      });

      if (this.props.waypoints)
      {
        this.props.waypoints.map((wp) => 
        {
          toastr.success(wp.name)
          let marker = new google.maps.Marker({
              position: new google.maps.LatLng(wp.latitude, wp.longitude),
              map: map,
              title: wp.name
          });
          
        });
      }   
    } catch(ex)
    {
      toastr.error('componentDidMount - ' + ex);
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
      <div width="200">{this.state.zoom}<br/>{this.state.center.lat()}, {this.state.center.lng()}</div><button onClick={this.buttonClicked}>zoom</button>
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
