import { PlaceService, Restaurant } from '../../services/place.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MouseEvent, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';
/* import { NewRestaurantDialogComponent } from '../new-restaurant-dialog/new-restaurant-dialog.component';
import { MatDialog } from '@angular/material'; */

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

  // Array of markers on google map.
  markers: Restaurant[] = this.placeService.restaurants;

  private previous: any;
  public markerLocation: any;
  public markerAdress: any;
  public dialogResult = '';

  constructor(public placeService: PlaceService,
    public gMaps: GoogleMapsAPIWrapper,
   /*  public addNewRestaurantDialog: NewRestaurantDialogComponent,
    public dialog: MatDialog */) {
    // Préchargement de la carte, voir pour actualiser ensuite*
    this.latitude = this.placeService.latitude;
    this.longitude = this.placeService.longitude;
  }

  ngOnInit() {
    setTimeout(() => {
      this.latitude = this.placeService.latitude;
      this.longitude = this.placeService.longitude;
      this.zoom = this.placeService.zoom;
      //   console.log('Mise à jour des coordonnées après 300 millisecondes');
    }, 300);

    setTimeout(() => {
      this.markers = this.placeService.restaurants;
    }, 400);
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
    // verifier que le marker existe!
    document.querySelector('#RestaurantId' + id).scrollIntoView();
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infoWindow;
  }

  // Click to creat a new marker
  // ouvrir une modale (push restaurants)
  mapClicked($event: MouseEvent) {
 // Zone de test =========>
    /* this.markerLocation = fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
    $event.coords.lat + ',' +
    $event.coords.lng + '&key=AIzaSyCXoe_E_QM1YIjMO22IU28UCqX1HI7Uets');
    console.log('result de this.markerLocation:', this.markerLocation); */
    this.markerAdress = 'this.markerLocation[1].formatted_address';
/* console.log('result de this.markerAdress:', this.markerAdress[1].formatted_address);
 */ // Zone de test <==========
    this.markers.push({
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      id: (this.markers.length + 1), // Nombre totals des restaurants de la zone +1
      name: 'Nouveau Restaurant!', // A récupérer avec input,
      rating: '0', // rating by default
      photo: '/assets/images/noPhoto.png',
      draggable: true,
      animation: 'DROP',
      vinanityAdress: this.markerAdress,  // Zone de test
      placeId: '',
      openingHours: '',
      reviews: []
    });
  }

  markerDragEnd(m: Restaurant, $event: MouseEvent) {
  }
}

