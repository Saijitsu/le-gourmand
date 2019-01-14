import { PlaceService, Marker } from '../../services/place.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MouseEvent, AgmMap, GoogleMapsAPIWrapper, AgmInfoWindow } from '@agm/core';


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
  markers: Marker[];

  private previous: any;

  constructor(public placeService: PlaceService, public gMaps: GoogleMapsAPIWrapper) {
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
      this.markers = this.placeService.markers;
      // this.placesList = this.placeService.placesList;
      //  console.log('Après 400 millisecondes => Création des markers:', this.markers);
    }, 400);
  }

  // Marker Over
  markerOver(m: Marker) {
    m.animation = 'BOUNCE';
  }

  // Marker Out
  markerOut(m: Marker) {
    m.animation = '';
  }

  // Click to a marker
  clickedMarker(label, infoWindow) {
    // verifier que le marker existe!
    document.querySelector('#RestaurantId' + label).scrollIntoView();
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infoWindow;
  }

  // Click to creat a new marker
  // ouvrir une modale (push restaurants + markers)
  mapClicked($event: MouseEvent) {
    this.markers.push({
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      label: (this.markers.length + 1).toString(), // Nombre totals des restaurants de la zone +1
      name: 'Créez-moi', // A récupérer avec input,
      rating: '',
      photo: '/assets/images/noPhoto.png',
      draggable: true,
      animation: 'DROP'
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    //  console.log('New Restaurant ici?', m, $event);
  }
}


/*
// just an interface for type safety.
interface Marker {
  latitude: number;
  longitude: number;
  label: string;
  name: string;
  rating: string;
  draggable: boolean;
  animation: 'DROP' | 'BOUNCE' | '';
} */
