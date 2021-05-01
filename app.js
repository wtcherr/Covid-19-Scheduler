var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB1k4XGYGcmkt_4SLe7yFkES8UTcJxnWIw&callback=initMap';
script.defer = true;
script.async = true;

var darkMode=[
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}]
  },
  {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        { visibility: "off" }
      ]
  }
];
var myMap;
var markers=[];
var directionsService;
var directionsRenderer;
var lstinfoWindow=null;
var myLocation;
var myMarker;
let userLatLng=0;
let newLatLng=0;
var places=[];
var ids=0;
var lstplaceid;
class place{
  constructor(){
    this.id=ids;
    this.name='';
    this.address='';
    this.type='GYM';
    this.owner='';
    this.rating=0;
    this.phoneNumber;
    this.LatLng=null;
    this.openTime=[];
    this.infoContent='';
  }
  setMarker(){
    var marker= new google.maps.Marker({
      name: this.id,
      position:this.LatLng,
      icon: makeIcon(this.type+'.png'),
      map:myMap,
    });
    var infoContent='<div class="marker-infowindow">'+
                        '<div class="marker-img" style="background-image: url(./Imgs/'+this.type+'.jpg)"></div>'+
                        '<h3>'+this.name+'</h3>'+
                        '<h3>'+this.type+'</h3>'+
                        '<div class="stars">'+
                            '<span class="fa fa-star checked"></span>'+
                            '<span class="fa fa-star checked"></span>'+
                            '<span class="fa fa-star checked"></span>'+
                            '<span class="fa fa-star"></span>'+
                            '<span class="fa fa-star"></span>'+
                        '</div>'+
                        '<div class="infowindow-btns">'+
                        '<button onClick="calcRoute(lstinfoWindow)">Go To</button>'+
                        '<button id="reserve">Reserve</button>'+
                        '</div>'+
                    '</div>';
    var infoWindow= new google.maps.InfoWindow({
      content: infoContent,
    });
    google.maps.event.addListener(marker,'click',function(){
      lstplaceid=this.name;
      console.log(lstplaceid);
      if(lstinfoWindow){
        lstinfoWindow.close();
      }
      if(directionsRenderer.map){
        directionsRenderer.setMap(null);
      }
      infoWindow.open(myMap,this);
      lstinfoWindow=infoWindow;
    });
    markers.push(this);
  }
}
function calcRoute(distination){
  if(distination.position!=userLatLng){
    var request={
      origin: userLatLng,
      destination: distination.position,
      travelMode: 'DRIVING'
    };
    directionsService.route(request,function(result,status){
      if(status=='OK'){
        directionsRenderer.setMap(myMap);
        directionsRenderer.setDirections(result);
      }
    });
  }
}
//function to make icons for the markers
function makeIcon(img){
  let base='./Imgs/MarkerIcons/';
  var icon = {
    url: base+img, // url
    scaledSize: new google.maps.Size(25, 25), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };
  return icon;
}
var types=['gym','restaurant']
function makeRandPlaces(n){
  for(var i=0;i<n;i++){
    var plc= new place;
    ids++;
    plc.name='Sparta Gym'
    if(i*7%3==0){
      plc.type=types[0];
      plc.name='Sparta Gym';
    }else{
      plc.type=types[1];
      plc.name='Belly Restaurant';
    }
    plc.LatLng={lat:myLocation.coords.latitude+(((-1)**i)*(i+1253)*52%9/1000),lng:myLocation.coords.longitude+((i+1153)*12%9/1000)};
    places.push(plc);
  }
}
function showPlaces() {
  for(var i=0;i<places.length;i++){
    places[i].setMarker();
  }
}
var showPosition = function (position) {
  myLocation=position;
  userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  // Do whatever you want with userLatLng.
  myMap.center=userLatLng;
  myMarker=new google.maps.Marker({
    position: userLatLng,
    icon: makeIcon('user.png'),
    map: myMap
  });
  infoWindow= new google.maps.InfoWindow({
    content:''
  });
  makeRandPlaces(8);
  showPlaces();
}
// Attach your callback function to the `window` object
window.initMap = function() {
  //options of the map
  var options={
      zoom:15,
      center: {lat:30.033333,lng:31.233334},
      //dark mode styles disable the styles for light mode
      styles: darkMode
  }
  //creating a map object
  myMap=new google.maps.Map(document.getElementById('map'),options);
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  navigator.geolocation.getCurrentPosition(showPosition);
};
// Append the 'script' element to 'head'
document.head.appendChild(script);
