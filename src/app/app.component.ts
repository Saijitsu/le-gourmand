// import { GoogleMap } from '@agm/core/services/google-maps-types';
import { MapsAPILoader } from '@agm/core';
import { PlaceService } from './services/place.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public places: PlaceService, public mapsAPILoader: MapsAPILoader) {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyBqfMIDB_oqrIJJ8lRxU6k1-ZmoquXDHmA',
      authDomain: 'le-gourmand-3f136.firebaseapp.com',
      databaseURL: 'https://le-gourmand-3f136.firebaseio.com',
      projectId: 'le-gourmand-3f136',
      storageBucket: '',
      messagingSenderId: '1060642938246'
    };
    firebase.initializeApp(config);
  }

  ngOnInit() {

/*Promise.all([this.mapsAPILoader.load(), this.places.getMap()]).then((valuesArray) => {
const map: GoogleMap = valuesArray[1];

const service = new google.maps.places.PlacesService(<HTMLDivElement>document.getElementsByTagName('agm-map')[0]);
console.log(service);*/

    /*});
    this.places.getMap().then((map) => {
      console.log('test ultime 1', map);
    });
    setTimeout(() => {
      this.places.getMap().then((map) => {
        console.log('test ultime 2', map);
      });
    }, 2000);*/
  }
}
