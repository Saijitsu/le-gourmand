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

            // Add new markers
            const addNewMarker = CreateMaker.create({
              latitude: this.placesList[i].geometry.location.lat(),
              longitude: this.placesList[i].geometry.location.lng(),
              label: (i + 1).toString(),
              name: this.placesList[i].name,
              photo: typeof results[i].photos !== 'undefined' // Check the photo array is present for each
                ? results[i].photos[0].getUrl(/*{'maxWidth': 100, 'maxHeight': 100}*/)
                : '/assets/images/noPhoto.jpg', // alternative photo,
              draggable: false
            });
            this.markers.push(addNewMarker);

            // Add new restaurants
            const addNewRestaurants = CreateRestaurants.create({
              id: i + 1,
              name: this.placesList[i].name,
              vinanityAdress: this.placesList[i].vicinity,
              latitude: this.placesList[i].geometry.location.lat(),
              longitude: this.placesList[i].geometry.location.lng(),
              rating: this.placesList[i].rating,
              percentageRating: ((this.placesList[i].rating) * 20).toString() + '%',
              placeId: this.placesList[i].place_id,
              photo: typeof results[i].photos !== 'undefined' // Check the photo array is present for each
                ? results[i].photos[0].getUrl(/*{'maxWidth': 100, 'maxHeight': 100}*/)
                : '/assets/images/noPhoto.jpg', // alternative photo
              openingHours: this.placesList[i].opening_hours,
            });
            this.restaurants.push(addNewRestaurants);
          }
        }
      });
    }, (error) => {
      console.log('Le chargement des données google places ne fonctionne pas:', error);
    });
  }
}

// Create Marker Data
// return une instance de MarkerList (défini la structure) avec CreateMaker.create() (implémente la structure)
class MarkerList {
  constructor(
    public latitude: number,
    public longitude: number,
    public label: string,
    public name: string,
    public photo: any,
    public draggable: boolean) { }
}

class CreateMaker {
  static create(event: MarkerList) {
    return new MarkerList(event.latitude, event.longitude, event.label, event.name, event.photo, event.draggable);
  }
}
// Create Restaurants Data
class Restaurants {
  constructor(
    public id: number,
    public name: string,
    public vinanityAdress: string,
    public latitude: string,
    public longitude: string,
    public rating: string,
    public percentageRating: string,
    public placeId: string,
    public photo: any,
    public openingHours: string) { }
}

class CreateRestaurants {
  static create(event: Restaurants) {
    return new Restaurants(event.id, event.name, event.vinanityAdress, event.latitude,
      event.longitude, event.rating, event.percentageRating, event.placeId, event.photo, event.openingHours);
  }
}

/*   public starsRating = [];

// Add new stars Rating
           const addStarRating = CreateStarRating.create({
            starRating: typeof Number((this.placesList[i].rating) * 20) !== 'undefined'
              // Check if value array is present for each
              ? ((this.placesList[i].rating) * 20).toString() + '%'
              : '0%', // Alternative
          });
          console.log(addStarRating);
          this.starsRating.push(addStarRating);

// return une instance de StarRatingList (défini la structure) avec CreateStarRating.create() (implémente la structure)
class StarRatingList {
  constructor(
    public starRating: string) { }
}

class CreateStarRating {
  static create(event: StarRatingList) {
    return new StarRatingList(event.starRating);
  }
}
*/
