
// import GoogleMapsLoader, {google} from 'google-maps';

//     $(document).ready(function() {
//         //alert(google);
//         // alert(GoogleMapsLoader);
//       // let map = Map(44.012077, -88.40526, 11, -1, 1);

//         GoogleMapsLoader.load(function(google) {
            
//             let myLatlng = new google.maps.LatLng(44.012077, -89.40526);
//             let options = {
//                 zoom: 11,
//                 center: myLatlng,
//                 mapTypeId: google.maps.MapTypeId.TERRAIN
//             }            
//             new google.maps.Map(document.getElementById("map_canvas"), options);
//         });
      
//     });

// //    function Map(lat, lng, zoom, waypointFileId) {
// //     "use strict";
// //     var fileId = waypointFileId;
// //     var markers = [];
// //     var bounds = new google.maps.LatLngBounds();
// //     var myLatlng = new google.maps.LatLng(lat,lng);
// //     var myOptions = {
// //         zoom: zoom,
// //         center: myLatlng,
// //         mapTypeId: google.maps.MapTypeId.TERRAIN
// //     }
// //     var infowindow = new google.maps.InfoWindow();

// //     var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

// //     // if (false) {
// //     //     //Navionics NauticalChart
// //     //     let navionics_nauticalchart_layer = new JNC.Views.gNavionicsOverlay({
// //     //         navKey: "Navionics_webapi_00713",
// //     //         chartType: JNC.Views.gNavionicsOverlay.CHARTS.SONAR,
// //     //         isTransparent: true,
// //     //         depthUnit: JNC.DEPTH_UNIT.FOOT

// //     //     });

// //     //     map.overlayMapTypes.insertAt(0, navionics_nauticalchart_layer);
// //     //     // alert(navionics_nauticalchart_layer);
// //     // }
// //     google.maps.event.addListener(map, "rightclick", function (event) {
// //         var lat = event.latLng.lat();
// //         var lng = event.latLng.lng();
// //         var description = 'new waypoint';
// //         var marker = new google.maps.Marker({
// //             position: new google.maps.LatLng(lat, lng),
// //             map: map,
// //             icon: '/Content/marker.png',// + value['marker'],
// //             scrollwheel: false,
// //             streetViewControl: true,
// //             title: description
// //         });

// //         bounds.extend(marker.position);


// //         console.log(waypointFileId);
// //         if (waypointFileId != -1) {
// //             // alert(waypointFileId); // TODO for some reason, the popup doesn't work unless this alert is here.
// //             // populate yor box/field with lat, lng
// //             // alert("Lat=" + lat + "; Lng=" + lng);
// //             console.log('adding point.');
// //             var content = '<div id="info" style="width: 100;">' + 'new waypoint' + '</div><div>lat = ' + lat + '</div><div>lng = ' + lng + '</div>' +
// // '<div><a href="/Waypoints/Create?waypointFileId=' + fileId + '&latitude=' + lat + '&longitude=' + lng + '" class="btn btn-primary m-r-5">Create waypoint</a></div>';
// //             infowindow.setContent(content);
// //             infowindow.open(map, marker);
// //             console.log('done adding point.');
// //         }
// //         else {
// //             alert('waypointFileId = ' + waypointFileId);
// //         }
// //         });

// //     return {
// //         Map: function () { return map; },
// //         AddMarker: function (lat, lng, description, waypointId) {
// //             var marker = new google.maps.Marker({
// //                 position: new google.maps.LatLng(lat, lng),
// //                 map: map,
// //                 icon: '/Content/marker.png',// + value['marker'],
// //                 scrollwheel: false,
// //                 streetViewControl: true,
// //                 title: description
// //             });
// //             bounds.extend(marker.position);
// //             marker.addListener('click', function () { });
// //             google.maps.event.addListener(marker, 'rightclick', function () {
// //                 var content = '<div id="info" style="width: 100;"><a href="/Waypoints/Edit/' + waypointId + '">Edit</a></div><div><a href="/Waypoints/Delete/' + waypointId + '">Delete</a></div><div><a href="/Waypoints/Move/' + waypointId + '">Move</a></div><div><a href="/Waypoints/Copy/' + waypointId + '">Copy</a></div>';
// //                 infowindow.setContent(content);
// //                 infowindow.open(map, marker);
// //             })
// //             google.maps.event.addListener(marker, 'click', function () {
// //                 // Setting the content of the InfoWindow
// //                 // var content = '<div id="info" class="span5"><div class="row">' + '<div class="span2"><img src="css/images/houses/house_' + (key + 1) + '.jpg" class="thumbnail" style="width:135px"/></div>' + '<div class="span3"><h3>' + value['title'] + '</h3><h6>' + value['street'] + '</h6>' + '<strong>&pound;' + value['price'] + '</strong>' + '<p><a href="property.html">Read More >></a></p>' + '</div></div></div>';
// //                 var content = '<div id="info" style="width: 100;">' + description + '</div><div>lat = ' + lat + '</div><div>lng = ' + lng + '</div>';
// //                 infowindow.setContent(content);
// //                 infowindow.open(map, marker);
// //             });

// //             return marker;
// //         }
// //         ,
// //         AddPicture: function (lat, lng, description, pictureId) {
// //             var marker = new google.maps.Marker({
// //                 position: new google.maps.LatLng(lat, lng),
// //                 map: map,
// //                 icon: '/Content/marker1.png',
// //                 scrollwheel: false,
// //                 streetViewControl: true,
// //                 title: description
// //             });

// //             bounds.extend(marker.position);
// //             marker.addListener('click', function () { });

// //             google.maps.event.addListener(marker, 'click', function () {
// //                 var content = '<div id="info" style="width: 100;">lat = ' + lat + '</div><div>lng = ' + lng + '</div><div>' + description + '</div><div><img src="/Pictures/Image?pictureId=' + pictureId + '" width="50%" alt="' + description + '" /></div>';
// //                 infowindow.setContent(content);
// //                 infowindow.open(map, marker);
// //             });

// //             return marker;
// //         }
// //                 ,
// //         AddTrackPoint: function (lat, lng) {
// //             var marker = new google.maps.Marker({
// //                 position: new google.maps.LatLng(lat, lng),
// //                 map: map,
// //                 icon: '/Content/trackpoint.png',
// //                 scrollwheel: false,
// //                 streetViewControl: true
// //             });

// //             bounds.extend(marker.position);
// //             return marker;
// //         }
// //         ,
// //         FitBounds: function (zoom) {
// //             map.fitBounds(bounds);
// //             var listener = google.maps.event.addListener(map, "idle", function () {
// //                 if (map.getZoom() > 16) map.setZoom(16);
// //                 map.setZoom(11);
// //                 google.maps.event.removeListener(listener);
// //             });
// //         },
// //         RemoveMarker: function (marker)
// //         {
// //             marker.map = null;
// //             // alert('remove');
// //             return false;
// //         }
// //     };
// // }