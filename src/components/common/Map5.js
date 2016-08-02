import React, {PropTypes} from 'react';
import toastr from 'toastr';
import WaypointListRow from '../waypoints/WaypointListRow';
import GoogleMapsLoader from 'google-maps';


class SingletonMap {

    constructor()
    {
        let _this = this;
	    toastr.success('SingletonMap constructor');

        GoogleMapsLoader.KEY = 'AIzaSyCG_KuXMd6mrgAzrRcgXr91Yr6Ed03VNaw';
        GoogleMapsLoader.LIBRARIES = ['geometry', 'places', 'visualization'];    //geometry,places,visualization
        GoogleMapsLoader.load(function(google) {

            let mapElement = document.getElementById("map_canvas");

            let options = {
                zoom: 7,
                center: new google.maps.LatLng(44.012077, -89.40526)
            };
            _this._map = new google.maps.Map(mapElement, options);

            if (_this._parentElement != null)
            {
                _this.appendMap(_this._parentElement, _this.deleteFunction, _this.insertFunction, _this.editFunction);
            }

            _this._map.addListener("click", function() {
                //let curpos = 
                _this.insertFunction(1, 2);
            })
            toastr.success('SingletonMap done loading');

        });       
        
    }

    addMarker()
    {
        let _this = this;
        GoogleMapsLoader.load(function(google) {
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(44.012077, -89.40526),
                map: _this._map,
                title: 'wp.name'
            });

            let wp = { name: "wp in marker", lat: 44.012077, lng: -89.40526 };
            marker.tag = wp;

            marker.addListener('click', function() {
                _this.editFunction(marker.tag);
            });            
            marker.addListener('rightclick', function() {
                _this.deleteFunction(marker.tag);
            });                
        });
    }

    appendMap2(deleteFunction, insertFunction, editFunction)
    {
        this.appendMap(this._parentElement, deleteFunction, insertFunction, editFunction);
    }
    
    appendMap(parentElement, deleteFunction, insertFunction, editFunction)
    {
        let mapElement = document.getElementById("map_canvas");
        if (mapElement != null && parentElement != null) {
            mapElement.style.display='block';
            parentElement.appendChild(mapElement);
            toastr.success("Appended map!")
        }
        else
        {
            toastr.error("Couldn't append map! - map:" + mapElement + " - parent:" + parentElement);
        }
        this._parentElement = parentElement;

        let wp = { name: "name", lat: 44.012077, lng: -89.40526 };
        this.deleteFunction = deleteFunction;
        this.insertFunction = insertFunction;
        this.editFunction = editFunction;
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
}

const _SingletonMap = new SingletonMap();

class Map5 extends React.Component {
    constructor(props, context) {
        super(props, context);

        toastr.success('Map5 constructor');
        this.setElement = this.setElement.bind(this);
        this.addMyMarker = this.addMyMarker.bind(this);
    }

	componentDidMount(prevProps,  prevState) {
        toastr.success('componentDidMount');
        _SingletonMap.appendMap2(this.deleteWaypoint, this.insertWaypoint, this.editWaypoint);
    }

    componentWillUnmount() {
        _SingletonMap.releaseMap();
        GoogleMapsLoader.load(function(google) {

        });     
    }

    deleteWaypoint(wp)
    {
        alert('deleteWaypoint - ' + wp.name);
    }

    insertWaypoint(lat, lng)
    {
        alert('insertWaypoint - ' + lat + '-' + lng);
    }

    editWaypoint(wp)
    {
        alert('editWaypoint - ' + wp.name);
    }

    setElement(c)
    {
        toastr.success('set element ' + c);
        // _SingletonMap._mapElement=c;
        _SingletonMap.appendMap(c, this.deleteWaypoint, this.insertWaypoint, this.editWaypoint);
    }

    addMyMarker()
    {
        _SingletonMap.addMarker();
    }

    render() {
        toastr.success('render map5');
        return (
            <div className="row" ><button onClick={this.addMyMarker}>click</button>
                <div className="col-md-12 well">
                    <div id="map_canvas4" width="400" ref={this.setElement}></div>
                </div>
            </div>
        );
    }
}

export default Map5;