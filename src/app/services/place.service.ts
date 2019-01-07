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
    this.zoom = 10;
    this.latitude = 47.2632799;
    this.longitude = -1.5164536;

    // set current position
    this.setCurrentPosition();
    // console.log('coordonnées actualisées', this.location);

    // create the places list of restaurants
    setTimeout(() => {
      this.getRestaurants();
      // console.log('la methode getRestaurants() fait disparaître la carte?!');
    }, 200);

/* // Review Test 07/01/2018
 setTimeout(() => {
    this.entry = 0;
    this.getDetail();
    console.log('Contenu de la review:', this.detailData);
  }, 800); */
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
      // const service = new google.maps.places.PlacesService(<HTMLDivElement>document.getElementsByTagName('agm-map')[0]);
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
              this.placesList[i].rating,
              typeof results[i].photos !== 'undefined' // Check the photo array is present for each
                ? results[i].photos[0].getUrl(/*{'maxWidth': 100, 'maxHeight': 100}*/)
                : '/assets/images/noPhoto.png', // alternative photo,
             false,
             'DROP'
            );
            this.markers.push(addNewMarker);

            // Add new restaurants
            const addNewRestaurants = new Restaurant (
              i + 1,
              this.placesList[i].name,
              this.placesList[i].vicinity,
              this.placesList[i].geometry.location.lat(),
              this.placesList[i].geometry.location.lng(),
              this.placesList[i].rating,
              this.placesList[i].place_id,
              typeof results[i].photos !== 'undefined' // Check the photo array is present for each
                ? results[i].photos[0].getUrl(/*{'maxWidth': 100, 'maxHeight': 100}*/)
                : '/assets/images/noPhoto.png', // alternative photo
              this.placesList[i].opening_hours,
              [{
                      author_name: 'Testeur',
                      profile_photo_url: 'http://toto',
                      rating: 3,
                      relative_time_description: 'hier',
                      text: 'Super bon'}],
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
    placeId: this.restaurants[restaurantIndex].placeId, // insert ID here ex:'ChIJ38ZsTHD-EUgRaFUkx0PlZX8'
    fields: ['review']
  }, (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      this.restaurants[restaurantIndex].reviews.splice(0, 0, ...results.reviews);
      console.log(this.restaurants[restaurantIndex]);
    }
  }, (error) => {
    console.log('Le chargement des données google places detail ne fonctionne pas:', error);
  });
}
}


// Create Marker Data
// return une instance de MarkerList (défini la structure) avec CreateMarker.create() (implémente la structure)
// rename: Marker
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

