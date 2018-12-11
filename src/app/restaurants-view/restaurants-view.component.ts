import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { PlaceService } from '../services/place.service';
// import { GoogleMap } from '@agm/core/services/google-maps-types';

declare let google: any;

@Component({
  selector: 'app-restaurants-view',
  templateUrl: './restaurants-view.component.html',
  styleUrls: ['./restaurants-view.component.scss']
})

export class RestaurantsViewComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;

  constructor(private mapsAPILoader: MapsAPILoader, private placeService: PlaceService) { }

  ngOnInit() {
    // set google maps defaults
    this.zoom = 12;
    this.latitude = 47.2632799;
    this.longitude = -1.5164536;

    // set current position
    this.setCurrentPosition();

    // prepare to using find Place from Query methode
    const request = {
      query: 'restaurant',
      fields: ['photos', 'formatted_address', 'name', 'rating', 'opening_hours', 'geometry'],
    };

   this.mapsAPILoader.load().then(() => {
     console.log('le contenu de google maps:', google);
    // const service = new google.maps.places.PlacesService(<HTMLDivElement>document.getElementsByTagName('agm-map')[0]);
   // console.log('accès à la librairies', service);
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
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

}
