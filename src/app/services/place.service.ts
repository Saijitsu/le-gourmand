import { Injectable, OnInit } from '@angular/core';
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';

declare let google: any;

@Injectable({
  providedIn: 'root'
})
export class PlaceService implements OnInit {

  public latitude: number;
  public longitude: number;
  public location: Coordinates;
  public zoom: number;
  public placesList: any = [];

  markers = [
    {
      latitude: 47.2634,
      longitude: -1.5144,
      label: '0',
      draggable: true,
    },
    {
      latitude: 47.263779,
      longitude: -1.51647,
      label: '1',
      draggable: true,
    },
    {
      latitude: 47.2632779,
      longitude: -1.516755,
      label: '2',
      draggable: true,
    }/*,
    {
      latitude: this.placesList[3].geometry.location.lat(),
      longitude: this.placesList[3].geometry.location.lng(),
      label: '3',
      draggable: false,
    }*/];

  constructor(public mapAPIloader: MapsAPILoader, public gMaps: GoogleMapsAPIWrapper) {
    // set google maps defaults
    this.zoom = 12;
    this.latitude = 47.2632799;
    this.longitude = -1.5164536;

    // set current position
    this.setCurrentPosition();
    console.log('coordonnées actualisées', this.location);

    // create the places list of restaurants
    setTimeout(() => {
      this.getRestaurants();
      console.log('La liste des restaurants après 1 secondes, la carte disparait:', this.placesList);
    }, 1000);
  }

  ngOnInit() {
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = position.coords;
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        console.log('Votre position actuelle est :');
        console.log(`Latitude : ${position.coords.longitude}`);
        console.log(`Longitude : ${position.coords.latitude}`);
        console.log(`La précision est de ${position.coords.accuracy} mètres.`);
      });
    }
  }

  private getRestaurants() {
    return this.mapAPIloader.load().then(() => {
      const service = new google.maps.places.PlacesService(<HTMLDivElement>document.getElementsByTagName('agm-map')[0]);
      // console.log(service); // Doit return tableau des restaurants

      service.nearbySearch({
        location: { lat: this.latitude, lng: this.longitude },
        radius: 750,
        type: ['restaurant']
      }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            this.placesList.push(results[i]);
          }
          //  console.log('La liste des restaurants:', this.placesList);
        }
      });
    }, (error) => {
      console.log('Le chargement des données google places ne fonctionne pas:', error);
    });
  }
}
