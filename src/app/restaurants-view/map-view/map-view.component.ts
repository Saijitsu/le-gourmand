import { PlaceService } from '../../services/place.service';
import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MouseEvent, AgmMap } from '@agm/core';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})

export class MapViewComponent implements OnInit {

  @ViewChild(AgmMap) agmMap;

 // google maps zoom level
  zoom: any = 12;

  // initial center position for the map
latitude: any = 47.2632799;
longitude: any = -1.5164536;

  markers: Marker[] = [
    {
      latitude: 47.269598,
      longitude: -1.517556,
      label: '1',
      draggable: true,
    },
    {
      latitude: 47.269900,
      longitude: -1.519183,
      label: '2',
      draggable: false,
    }
  ];

 constructor(public place: PlaceService, public mapsAPILoader: MapsAPILoader) {
}


  ngOnInit() {
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the Marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      latitude: $event.coords.lat,
      longitude: $event.coords.lng,
      draggable: true,
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
}

// just an interface for type safety.
interface Marker {
  latitude: any;
  longitude: any;
  label?: string;
  draggable: boolean;
}

