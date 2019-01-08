import { Review } from './../restaurant-reviews/restaurant-review.component';
import { PlaceService, Restaurant } from './../../services/place.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
/* import { RestaurantComponent } from '../restaurant/restaurant.component';
 */
@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  // Array of restaurants
  restaurants: Restaurant[];

  // Array of reviews
  reviews: Review;

  constructor(public placeService: PlaceService, /* public restaurantComponent: RestaurantComponent */) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.restaurants = this.placeService.restaurants;
      console.log('affichage de la liste des restaurants après 300 millisecondes', this.restaurants);
    }, 300);
  }

  getRestaurantDetails(restaurantIndex: number) {
    // showReviews = true;
    if (this.restaurants[restaurantIndex].reviews === undefined || this.restaurants[restaurantIndex].reviews.length === 0) {
      // array empty or does not exist
      this.placeService.getDetails(restaurantIndex);
      this.restaurants[restaurantIndex].reviews = this.placeService.restaurants[restaurantIndex].reviews;
      console.log('affiche le contenu de "this.restaurants[restaurantIndex].reviews":', this.restaurants[restaurantIndex].reviews);
    }
  }
}
