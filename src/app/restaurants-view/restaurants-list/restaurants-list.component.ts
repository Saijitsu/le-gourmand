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

  // Review Test 07/01/2019
  placeDetailsResults: any[];

// Show/Hide review element
  showReviews = false;
  showAddReview = false;

  constructor(public placeService: PlaceService) {
/* this.reviews = {
  author_name: 'Testeur',
  profile_photo_url: 'http://toto',
rating: 3,
relative_time_description: 'hier',
text: 'Super bon'}; */
  }

  ngOnInit() {
    setTimeout(() => {
      this.restaurants = this.placeService.restaurants;
      console.log('affichage de la liste des restaurants après 300 millisecondes', this.restaurants);
    }, 300);

// Review Test 07/01/2019
setTimeout(() => {
  // console.log('la methode getRestaurants() fait disparaître la carte?!');
  this.placeService.entry = 0;
  this.placeService.getDetail();
  this.placeDetailsResults =  this.placeService.placeDetailsResults;
    console.log('Contenu de la review:', this.placeDetailsResults);
  // console.log('auteur du premier commentaire:', this.placeDetailsResults);
  // ['result']['reviews'][i]['rating'] ???
}, 800);
  }
}
