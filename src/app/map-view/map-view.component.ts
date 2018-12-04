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
  public lat: any = 47.263307;
  public lng: any = -1.516461;

  constructor() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
        console.log('Votre position actuelle est :');
        console.log(`Latitude : ${pos.coords.longitude}`);
        console.log(`Longitude : ${pos.coords.latitude}`);
        console.log(`La précision est de ${pos.coords.accuracy} mètres.`);
      });
    }
  }

  markers: Marker[] = [
    {
      lat: 47.269598,
      lng: -1.517556,
      label: 'A',
      draggable: true,
      custom: '{ url: "./assets/images/map-marker.png", scaledSize: { width: 40,height: 60}}'
    },
    {
      lat: 47.269900,
      lng: -1.519183,
      label: 'B',
      draggable: false,
      custom: '{url: "./assets/images/map-marker.png", scaledSize: { width: 40, height: 60}}'
    }
  ];

  clickedMarker(label: string, index: number) {
    console.log(`clicked the Marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true,
      custom: '',
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  ngOnInit() {
  }

}

// just an interface for type safety.
interface Marker {
  lat: any;
  lng: any;
  label?: string;
  draggable: boolean;
  custom: any;
}

