import { Component, OnInit } from '@angular/core';
// import { PlaceService } from '../services/place.service';
// import { GoogleMap } from '@agm/core/services/google-maps-types';

declare let google: any;

@Component({
  selector: 'app-restaurants-view',
  templateUrl: './restaurants-view.component.html',
  styleUrls: ['./restaurants-view.component.scss']
})

export class RestaurantsViewComponent implements OnInit {

 // public latitude: number;
 // public longitude: number;
  // public zoom: number;

  constructor(/*private placeService: PlaceService*/) {
   // this.latitude = this.placeService.latitude;
   // this.longitude = this.placeService.longitude;
   // this.zoom = this.placeService.zoom;
   }

  ngOnInit() {
  }
}

//  Restaurant interface is using json literals to create the array element
interface Restaurant {
  id: string;
  name: string;
  vinanityAdress: string;
  latitude: string;
  longitude: string;
  rating: string;
  review: string;
  photo: string;
  openingHours: string;
}

// The array element
const restaurants: Restaurant[] = [];

restaurants.push({
  id: '',
  name: '',
  vinanityAdress: '',
  latitude: '',
  longitude: '',
  rating: '',
  review: '',
  photo: '',
  openingHours: ''
});


