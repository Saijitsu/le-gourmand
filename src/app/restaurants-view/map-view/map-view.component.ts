import { PlaceService, Restaurant } from '../../services/place.service';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MouseEvent, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { RestaurantsViewComponent } from '../restaurants-view.component';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})

export class MapViewComponent implements OnInit {

  @ViewChild(AgmMap) agmMap;

  // google maps zoom level
  zoom: number;

  // initial center position for the map
  latitude: number;
  longitude: number;

  public markerLocation: any;
  public dialogResult = '';

  constructor(public placeService: PlaceService,
    public gMaps: GoogleMapsAPIWrapper,
    public restaurantView: RestaurantsViewComponent,
    private ngZone: NgZone) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.latitude = this.placeService.latitude;
      this.longitude = this.placeService.longitude;
      this.zoom = this.placeService.zoom;
    }, 300);
  }

  // Marker Over
  markerOver(m: Restaurant) {
    m.animation = 'BOUNCE';
  }

  // Marker Out
  markerOut(m: Restaurant) {
    m.animation = '';
  }

  // Click to a marker
  clickedMarker(id, infoWindow) {
    document.querySelector('#RestaurantId' + id).scrollIntoView();
    if (this.placeService.previousInfoWindow) {
      this.placeService.previousInfoWindow.close();
    }
    this.placeService.previousInfoWindow = infoWindow;
  }

  // Click to creat a new marker
  mapClicked($event: MouseEvent) {

    const addNewRestaurants = new Restaurant(
      this.placeService.customRestaurants.length, // id:
      'Nouveau Restaurant!', // name:
      'Adresse à déterminer!', // vinanityAdress:
      $event.coords.lat, //  latitude:
      $event.coords.lng, // longitude:
      undefined, // rating:
      '1', // placeId:
      '/assets/images/noPhoto.png', // photo:
      '', // openingHours:
      [], // reviews:
      true, // draggable:
      'DROP' // animation:
    );
    this.placeService.restaurants.push(addNewRestaurants);
    this.placeService.clickLocation = $event.coords;
    this.placeService.getMarkerAdress();
  }

  markerMoved($event: MouseEvent) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': $event.coords }, (res, status) => {
      if (status === google.maps.GeocoderStatus.OK && res.length) {
        this.ngZone.run(() => this.setLocation(res[0])); } });
      }

  setLocation(place) {
    this.placeService.latitude = place.geometry.location.lat();
    this.placeService.longitude = place.geometry.location.lng();
    this.placeService.placesList = [];
    this.placeService.restaurants = [];
    this.placeService.getRestaurants();
  }
}
