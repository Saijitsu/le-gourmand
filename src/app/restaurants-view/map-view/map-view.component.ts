import { PlaceService, Restaurant } from '../../services/place.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MouseEvent, AgmMap, GoogleMapsAPIWrapper, LatLngLiteral } from '@agm/core';
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

/*   // Array of markers on google map.
  markers: Restaurant[] = this.placeService.customRestaurants; */

  public markerLocation: any;
  public dialogResult = '';

  constructor(public placeService: PlaceService,
    public gMaps: GoogleMapsAPIWrapper,
    public restaurantView: RestaurantsViewComponent) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.latitude = this.placeService.latitude;
      this.longitude = this.placeService.longitude;
      this.zoom = this.placeService.zoom;
    }, 300);

/*     setTimeout(() => {
      this.markers = this.placeService.customRestaurants;
    }, 400); */
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
      '0', // rating:
      '', // placeId:
      '/assets/images/noPhoto.png', // photo:
      '', // openingHours:
      [], // reviews:
      true, // draggable:
      'DROP' // animation:
    );
    this.placeService.restaurants.push(addNewRestaurants);

   /*  // Zone de test ======= ADRESS AUTO
    this.placeService.clickLocation = $event.coords;
    this.placeService.getMarkerAdress();
    // Zone de test <========== */
  }

  markerDragEnd(m: Restaurant, $event: MouseEvent) {
  }
}

