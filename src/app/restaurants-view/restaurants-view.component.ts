import { Component, NgZone, OnInit } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-restaurants-view',
  templateUrl: './restaurants-view.component.html',
  styleUrls: ['./restaurants-view.component.scss']
})

export class RestaurantsViewComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public zoom: number;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

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

   const service = new google.maps.places.PlacesService(map);

   service.findPlaceFromQuery(request, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {

      results.forEach((item) => {
        console.log(item);
        // place_id, name, formatted_address, geometry.location, icon
      });
    }
  });

    // load Places Autocomplete (remplace searcheElementRef here by ?)
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
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
