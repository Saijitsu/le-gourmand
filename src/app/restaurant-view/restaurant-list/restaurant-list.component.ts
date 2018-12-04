import { MapViewComponent } from './../../map-view/map-view.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
/*
const mapCenter = new google.maps.LatLng(MapViewComponent.lat, MapViewComponent.lng);

const map = new google.maps.Map(document.getElementById('map'), {
  center: mapCenter,
  zoom: 8
});

const placeService = new google.maps.places.PlacesService(map);

const request = {
  query: 'restaurant',
  fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
};

placeService.findPlaceFromQuery(request, (results, status) => {
  if (status === google.maps.places.PlacesServiceStatus.OK) {

    results.forEach((item) => {
      console.log(item);
      // 'photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'
    });
  }
});
*/
