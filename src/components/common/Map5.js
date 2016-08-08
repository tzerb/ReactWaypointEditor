import React, {PropTypes} from 'react';
import toastr from 'toastr';
import WaypointListRow from '../waypoints/WaypointListRow';
import GoogleMapsLoader from 'google-maps';
import ApiConfig from '../../api/ApiConfig';

class SingletonMap {

    constructor()
    {
        this.loaded = false;
        let _this = this;

        this.Markers = [];  
        GoogleMapsLoader.KEY = 'AIzaSyCG_KuXMd6mrgAzrRcgXr91Yr6Ed03VNaw';
        GoogleMapsLoader.LIBRARIES = ['geometry', 'places', 'visualization'];    //geometry,places,visualization
        GoogleMapsLoader.load(function(google) {

            let mapElement = document.getElementById("map_canvas");

            let options = {
                zoom: 7,
                center: new google.maps.LatLng(44.012077, -89.40526)
            };
            _this._map = new google.maps.Map(mapElement, options);
 

            _this._map.addListener("click", function(event) {
                _this.insertFunction(event.latLng.lat(), event.latLng.lng());
            });

            _this._map.addListener('zoom_changed', function() {
                _this.zoomChangedFunction(_this._map.getZoom());
            });

            _this._map.addListener('dragend', function() {
                _this.positionChangedFunction(_this._map.getCenter());
            });

            //toastr.success('SingletonMap done loading');
            _this.loaded = true;
            toastr.success('map loaded');

            if (_this._parentElement != null)
            {
                _this.appendMap(_this._parentElement, _this.deleteFunction, _this.insertFunction, _this.editFunction, _this.zoomChangedFunction, _this.positionChangedFunction);
            }

        });       
         
    }

    addMarker(name, lat, lng, tag)
    {
        let _this = this;
        GoogleMapsLoader.load(function(google) {
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(lat, lng),
                map: _this._map,
                title: name
            });
            _this.Markers.push(marker);

            marker.tag = tag;

            marker.addListener('click', function() {
                _this.editFunction(marker.tag);
            });       

            marker.addListener('rightclick', function() {
                _this.deleteFunction(marker.tag);
            });                
        });
    }

    appendMap2(deleteFunction, insertFunction, editFunction, zoomChangedFunction, positionChangedFunction)
    {
        this.appendMap(this._parentElement, deleteFunction, insertFunction, editFunction, zoomChangedFunction, positionChangedFunction);
    }
    
    appendMap(parentElement, deleteFunction, insertFunction, editFunction, zoomChangedFunction, positionChangedFunction)
    {
        let mapElement = document.getElementById("map_canvas");
        if (mapElement != null && parentElement != null) {
            mapElement.style.display='block';
            parentElement.appendChild(mapElement);
        }
        this._parentElement = parentElement;

        let wp = { name: "name", lat: 44.012077, lng: -89.40526 };
        this.deleteFunction = deleteFunction;
        this.insertFunction = insertFunction;
        this.editFunction = editFunction;
        this.zoomChangedFunction = zoomChangedFunction;
        this.positionChangedFunction = positionChangedFunction;
    }

    releaseMap()
    {
        let holderElement = document.getElementById("map_holder");
        let mapElement = document.getElementById("map_canvas");
        holderElement.appendChild(mapElement);
        mapElement.style.display='none';

        // TODO TZ Remove markers
        // TODO TZ reset zoom and center
    }
    clearMarkers() 
    {
        for(let i = 0; i<this.Markers.length; i++)
        {
            this.Markers[i].setMap(null);
        }
    }

}

let _SingletonMap = null;

class Map5 extends React.Component {
    constructor(props, context) {
        super(props, context);

        _SingletonMap = new SingletonMap();
        this.setElement = this.setElement.bind(this);
        this.addMyMarker = this.addMyMarker.bind(this);
        this.addMarkers2 = this.addMarkers2.bind(this);
        
    }

	componentDidMount(prevProps,  prevState) {
        _SingletonMap.appendMap2(this.deleteWaypoint, this.insertWaypoint, this.editWaypoint, this.zoomChangedFunction, this.positionChangedFunction);
    }

    componentWillUnmount() {
        _SingletonMap.releaseMap();
        GoogleMapsLoader.load(function(google) {

        });     
    }

    deleteWaypoint(wp)
    {
        //alert('deleteWaypoint - ' + wp.name);
    }
 
    insertWaypoint(lat, lng)
    {
        //alert('insertWaypoint - ' + lat + '-' + lng);
    }

    editWaypoint(wp)
    {
        //alert('editWaypoint - ' + wp.name);
    } 

    zoomChangedFunction(zoom)
    {
        //alert('zoomChangedFunction - ' + zoom);
    }

    positionChangedFunction(centerPosition)
    {
        //alert('positionChangedFunction - ' + centerPosition.lat() + '-' + centerPosition.lng());
    }

    setElement(c)
    {
        _SingletonMap.appendMap(c, this.deleteWaypoint, this.insertWaypoint, this.editWaypoint, this.zoomChangedFunction, this.positionChangedFunction);
    }

    addMyMarker()
    {
        _SingletonMap.clearMarkers();
        let wpx = this.props.waypoints[0]; //{ name: "wp 1", lat: 44.012077, lng: -89.40526 };
        //let wp4 = { name: wpx.name, lat: wpx.lat, lng: wpx.lng };
        let wp1 = { name: "wp 1", latitude: 44.012077, longitude: -89.40526 };

        let wp2 = { name: "wp 2", latitude: 43.012077, longitude: -89.40526 };
        let wp3 = { name: "wp 3", latitude: 44.012077, longitude: -88.40526 };
        //let wp4 = { name: "wp 4", lat: 43.012077, lng: -88.40526 };
        let wp4 = { name: wpx.name, latitude: Number(wpx.latitude), longitude: -88.40526 };
        _SingletonMap.addMarker(wp1.name, wp1.latitude, wp1.longitude, wp1);
        _SingletonMap.addMarker(wp2.name, wp2.latitude, wp2.longitude, wp2);
        _SingletonMap.addMarker(wp3.name, wp3.latitude, wp3.longitude, wp3);
        _SingletonMap.addMarker(wp4.name, wp4.latitude, wp4.longitude, wp4);
    }
 
    addMarkers2()
    { 
        _SingletonMap.clearMarkers();
        //this.addMyMarker();
       // debugger;
        if (this.props.waypoints)
        {
            for(let i = 0; i<this.props.waypoints.length; i++)
            {
                let wp = this.props.waypoints[i];
                _SingletonMap.addMarker(wp.name, wp.latitude, wp.longitude, wp);
            }
        }
    }  
 
    render() {
        _SingletonMap.clearMarkers();
        this.addMarkers2(); 
        return (
            <div className="row" >
                {false && this.props.waypoints && (this.props.waypoints.length > 0) && <button onClick={this.addMarkers2}>click</button>}
                <div className="col-md-12">
                    <div id="map_canvas4"  ref={this.setElement}></div>
                </div>
            </div>
        );
    }
}
Map5.propTypes = {
  waypoints: PropTypes.array.isRequired
};
export default Map5; 