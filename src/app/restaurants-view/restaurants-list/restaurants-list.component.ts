import { Review } from './../restaurant-reviews/restaurant-review.component';
import { PlaceService, Restaurant } from './../../services/place.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

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

// Show/Hide review element
  showReviews = false;
  showAddReview = false;

  constructor(public placeService: PlaceService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.restaurants = this.placeService.restaurants;
      console.log('affichage de la liste des restaurants après 300 millisecondes', this.restaurants);
    }, 300);

// Review Test 07/01/2019
/* setTimeout(() => {
this.placeService.getDetails(0);
}, 800); */
  }

  getRestaurantDetails(restaurantIndex: number) {
    this.showReviews = true;
    this.placeService.getDetails(restaurantIndex);
  //  console.log(this);
  }
}
