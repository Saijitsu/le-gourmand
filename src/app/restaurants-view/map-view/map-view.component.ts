import { Restaurant } from './../../../models/retaurant.model';
import { PlaceService } from '../../services/place.service';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MouseEvent, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
import { RestaurantsViewComponent } from '../restaurants-view.component';

declare let google: any;

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})

export class MapViewComponent implements OnInit {

  @ViewChild(AgmMap) agmMap;

  public user: any;

  public markerLocation: any;
  public dialogResult = '';

  constructor(public placeService: PlaceService,
    public gMaps: GoogleMapsAPIWrapper,
    public restaurantView: RestaurantsViewComponent,
    private ngZone: NgZone) {
  }

  ngOnInit() {
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
    this.placeService.restaurants[id].showReviews = true;
    if (this.placeService.previousInfoWindow) {
      this.placeService.previousInfoWindow.close();
    }
    this.placeService.previousInfoWindow = infoWindow;
  }

  // Click to creat a new marker
  mapClicked($event: MouseEvent) {

    const addNewRestaurants = new Restaurant(
      this.placeService.restaurants.length, // id:
      'Nouveau Restaurant!', // name:
      'Adresse à déterminer!', // vinanityAdress:
      $event.coords.lat, //  latitude:
      $event.coords.lng, // longitude:
      undefined, // rating:
      '1', // placeId:
      'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' +
      $event.coords.lat + ',' +
      $event.coords.lng +
      '&fov=90&heading=235&pitch=5&key=AIzaSyCXoe_E_QM1YIjMO22IU28UCqX1HI7Uets',
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
