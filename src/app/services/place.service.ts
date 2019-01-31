import { Review } from './../restaurants-view/restaurant-reviews/restaurant-review.component';
import { Injectable, OnInit} from '@angular/core';
import { MapsAPILoader, GoogleMapsAPIWrapper, LatLngLiteral } from '@agm/core';

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
  public clickLocation: LatLngLiteral;
  public previousInfoWindow: any;
  public minValue: Number = 0;
  public maxValue: Number = 5;

  public markers = [];
  public restaurants = [];
  public selectedRestaurant: any;

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
        if (window.screen.width <= 600) {
          this.zoom = 14;
          } else {
          this.zoom = 15;
        }
      });
    }
  }

  public getRestaurants() {
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
              : 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' +
                this.placesList[i].geometry.location.lat() + ',' +
                this.placesList[i].geometry.location.lng() +
                '&fov=90&heading=235&pitch=5&key=AIzaSyCXoe_E_QM1YIjMO22IU28UCqX1HI7Uets',
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

  // Get details (reviews)
  getDetails(restaurantIndex: number) {
    const myDiv = <HTMLDivElement>document.createElement('div');
    const service = new google.maps.places.PlacesService(myDiv);
    console.log('this.restaurants[restaurantIndex].reviews', this.restaurants[restaurantIndex].reviews);
    service.getDetails({
      placeId: this.restaurants[restaurantIndex].placeId,
    }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.restaurants[restaurantIndex].reviews.length === 0 ?
        this.restaurants[restaurantIndex].reviews.splice(0, this.restaurants[restaurantIndex].reviews.length, ...results.reviews)
        : this.restaurants[restaurantIndex].reviews.splice(1, 0, ...results.reviews);
        console.log('this.restaurants[restaurantIndex].reviews', this.restaurants[restaurantIndex].reviews);
      }
    }, (error) => {
      console.log('Le chargement des données google places detail ne fonctionne pas:', error);
    });
  }

  // Get adress on Clicked Location on map
  getMarkerAdress() {
    console.log('this.restaurants:', this.restaurants,
      'sélection du dernier elt:', this.restaurants[this.restaurants.length - 1],
      'this.restaurants[this.restaurants.length - 1].vinanityAdress:', this.restaurants[this.restaurants.length - 1].vinanityAdress);

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': this.clickLocation }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0].formatted_address) {
          console.log('results[0].formatted_address:', results[0].formatted_address.toString());
          const addAdress: string = results[0].formatted_address.toString();
          this.restaurants[this.restaurants.length - 1].vinanityAdress = addAdress;
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  isFiltered(rating: number) {
    const max: Number = Math.max(this.minValue.valueOf(), this.maxValue.valueOf());
    const min: Number = Math.min(this.minValue.valueOf(), this.maxValue.valueOf());
    return  rating >= min && rating <= max || rating === undefined;
  }
}

// Create Restaurants Data
export class Restaurant {
  constructor(
    public id: number,
    public name: string,
    public vinanityAdress: string,
    public latitude: number,
    public longitude: number,
    public rating: string,
    public placeId: string,
    public photo: any,
    public reviews: Review[],
    public draggable: boolean = false,
    public animation: any = 'DROP') { }
}
