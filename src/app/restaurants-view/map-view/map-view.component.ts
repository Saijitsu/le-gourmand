import { PlaceService } from '../../services/place.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MouseEvent, AgmMap, GoogleMapsAPIWrapper } from '@agm/core';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})

export class MapViewComponent implements OnInit {

  @ViewChild(AgmMap) agmMap;
// test 23
 map: any;

  // google maps zoom level
  zoom: number;

  // initial center position for the map
  latitude: number;
  longitude: number;

  // list of restaurants
  placesList: Promise<void>;

    // Array of markers on google map.
    markers: Marker[];

  constructor(public placeService: PlaceService ,  public gMaps: GoogleMapsAPIWrapper) {
    // Préchargement de la carte, voir pour actualiser ensuite*
    this.latitude = this.placeService.latitude;
    this.longitude = this.placeService.longitude;
  }

  ngOnInit() {
    setTimeout(() => {
      this.latitude = this.placeService.latitude;
      this.longitude = this.placeService.longitude;
      this.zoom = this.placeService.zoom;
      this.markers = this.placeService.markers;
      console.log('affichage de les markers après 600 millisecondes', this.markers);
    }, 600);

    setTimeout(() => {
    this.placesList = this.placeService.placesList;
    console.log('ajout des contenus après 800 millisecondes', this.placesList);
  }, 800);
  }
// test 23
 setMap(map) {
    console.log('affiche le contenu de la carte:', map);
    this.map = map;
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
