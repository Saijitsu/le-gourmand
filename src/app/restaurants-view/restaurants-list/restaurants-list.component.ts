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

 // Array of restaurants.
 restaurants: Restaurant[];
  // Array of reviews.
  testReview: Review;

  constructor(public placeService: PlaceService) {
this.testReview = {
  author_name: 'Testeur',
  profile_photo_url: 'http://toto',
rating: 3,
relative_time_description: 'hier',
text: 'Super bon'};
  }

  ngOnInit() {
    setTimeout(() => {
      this.restaurants = this.placeService.restaurants;
      console.log('affichage de la liste des restaurants après 300 millisecondes', this.restaurants);
    }, 300);
  }
}

/*
interface Review {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}
 */
