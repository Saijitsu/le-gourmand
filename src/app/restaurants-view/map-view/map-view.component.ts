import { Component, OnInit } from '@angular/core';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  // google maps zoom level
  zoom: Number = 15;

  // initial center position for the map
  public lat: any = 47.2632799;
  public lng: any = -1.5164536;

  markers: Marker[] = [
    {
      lat: 47.269598,
      lng: -1.517556,
      label: '1',
      draggable: true,
    },
    {
      lat: 47.269900,
      lng: -1.519183,
      label: '2',
      draggable: false,
    }
  ];

  constructor() { }

  ngOnInit() {
    this.getUserLocation();
  }

  private getUserLocation() {
   /// locate the user
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
       this.lat = position.coords.latitude;
       this.lng = position.coords.longitude;
console.log('Votre position actuelle est :');
        console.log(`Latitude : ${position.coords.longitude}`);
        console.log(`Longitude : ${position.coords.latitude}`);
        console.log(`La précision est de ${position.coords.accuracy} mètres.`);
     });
   }
 }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the Marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}

// just an interface for type safety.
interface Marker {
  lat: any;
  lng: any;
  label?: string;
  draggable: boolean;
}

