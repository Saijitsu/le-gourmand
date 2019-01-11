import { Review } from './../restaurants-view/restaurant-reviews/restaurant-review.component';
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

  public markers = [];
  public restaurants = [];

  // Review Test 07/01/2019
  public placeDetailsResults = [];
  public entry: number;

  constructor(public mapAPIloader: MapsAPILoader, public gMaps: GoogleMapsAPIWrapper) {
    // set google maps defaults
    this.zoom = 15;
    this.latitude = 47.2632799;
    this.longitude = -1.5164536;

    // set current position
    this.setCurrentPosition();

    // create the places list of restaurants
    setTimeout(() => {
      this.getRestaurants();
    }, 200);
  }

  ngOnInit() {
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.location = position.coords;
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        console.log('Votre position actuelle est :');
        console.log(`Latitude : ${position.coords.longitude}`);
        console.log(`Longitude : ${position.coords.latitude}`);
        console.log(`La précision est de ${position.coords.accuracy} mètres.`);
      });
    }
  }

  private getRestaurants() {
    return this.mapAPIloader.load().then(() => {
      const myDiv = <HTMLDivElement>document.createElement('div');
      const service = new google.maps.places.PlacesService(myDiv);


      service.nearbySearch({
        location: { lat: this.latitude, lng: this.longitude },
        radius: 750,
        type: ['restaurant']
      }, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (let i = 0; i < results.length; i++) {
            this.placesList.push(results[i]);

            // Add new markers // Use create new markers
            const addNewMarker = new Marker(
              this.placesList[i].geometry.location.lat(),
              this.placesList[i].geometry.location.lng(),
              (i + 1).toString(),
              this.placesList[i].name,
              this.placesList[i].rating !== 'undefined'
                ? this.placesList[i].rating
                : '0', // Rating of 0 if undefined,
              typeof results[i].photos !== 'undefined' // Check the photo array is present for each
                ? results[i].photos[0].getUrl()
                : '/assets/images/noPhoto.png', // alternative photo,
              false,
              'DROP'
            );
            this.markers.push(addNewMarker);

            // Add new restaurants
            const addNewRestaurants = new Restaurant(
              i,
              this.placesList[i].name,
              this.placesList[i].vicinity,
              this.placesList[i].geometry.location.lat(),
              this.placesList[i].geometry.location.lng(),
              this.placesList[i].rating !== 'undefined'
                ? this.placesList[i].rating
                : '0', // Rating of 0 if undefined,
              this.placesList[i].place_id,
              typeof results[i].photos !== 'undefined' // Check the photo array is present for each
                ? results[i].photos[0].getUrl()
                : '/assets/images/noPhoto.png', // alternative photo
              this.placesList[i].opening_hours,
              []
            );
            this.restaurants.push(addNewRestaurants);
          }
        }
      });
    }, (error) => {
      console.log('Le chargement des données google places ne fonctionne pas:', error);
    });
  }

  // Review Test 07/01/2019
  getDetails(restaurantIndex: number) {
    const myDiv = <HTMLDivElement>document.createElement('div');
    const service = new google.maps.places.PlacesService(myDiv);
    service.getDetails({
      placeId: this.restaurants[restaurantIndex].placeId,
    }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.restaurants[restaurantIndex].reviews.splice(0, this.restaurants[restaurantIndex].reviews.length, ...results.reviews);
      }
    }, (error) => {
      console.log('Le chargement des données google places detail ne fonctionne pas:', error);
    });
  }
}

// Create Marker
export class Marker {
  constructor(
    public latitude: number,
    public longitude: number,
    public label: string,
    public name: string,
    public rating: string,
    public photo: any,
    public draggable: boolean,
    public animation: any) { }
}

// Create Restaurants Data
export class Restaurant {
  constructor(
    public id: number,
    public name: string,
    public vinanityAdress: string,
    public latitude: string,
    public longitude: string,
    public rating: string,
    public placeId: string,
    public photo: any,
    public openingHours: string,
    public reviews: Review[]) { }
}

