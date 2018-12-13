import { PlaceService } from '../../services/place.service';
// import { MapsAPILoader } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MouseEvent, AgmMap, MarkerManager } from '@agm/core';


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

  // list of restaurants
  placesList: Promise<void>;

    // Array of markers on google map.
    markers: Marker[]; /*= [
      {
        latitude: this.placesList[0].geometry.location.lat(),
        longitude: this.placesList[0].geometry.location.lng(),
        label: '0',
        draggable: true,
      },
      {
        latitude: this.placesList[1].geometry.location.lat(),
        longitude: this.placesList[1].geometry.location.lng(),
        label: '1',
        draggable: false,
      },
      {
        latitude: this.placesList[2].geometry.location.lat(),
        longitude: this.placesList[2].geometry.location.lng(),
        label: '2',
        draggable: true,
      },
      {
        latitude: this.placesList[3].geometry.location.lat(),
        longitude: this.placesList[3].geometry.location.lng(),
        label: '3',
        draggable: false,
      }
    ];*/

  constructor(public placeService: PlaceService /*, public mapsAPILoader: MapsAPILoader*/) {
    setTimeout(() => {
    this.latitude = this.placeService.latitude;
    this.longitude = this.placeService.longitude;
    this.zoom = this.placeService.zoom;
    this.markers = this.placeService.markers;
    console.log('affichage de la carte après 100 millisecondes');
  }, 600);
  }

  ngOnInit() {
    setTimeout(() => {
    this.placesList = this.placeService.placesList;
    console.log('ajout des contenus après 200 millisecondes');
  }, 800);
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
  latitude: number;
  longitude: number;
  label?: string;
  draggable: boolean;
}


/* ZONE DE TEST
function findUserLocation(userCurrentPosition) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(userCurrentPosition);
    }, 300);
  });
}

async function waitUpdate() {
  const userCurrentPosition = await findUserLocation(this.placeService.setCurrentPosition());
  return userCurrentPosition; // return latitude and longitude of user
}
// waitUpdate();
 FIN DE ZONE DE TEST
*/
