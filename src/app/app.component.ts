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
  }
}
