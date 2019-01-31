import { PlaceService } from './../../services/place.service';
import { Review } from './../restaurant-reviews/restaurant-review.component';
import { Component, OnInit, Input } from '@angular/core';
import { RestaurantComponent } from '../restaurant/restaurant.component';

@Component({
  selector: 'app-restaurant-add-review',
  templateUrl: './restaurant-add-review.component.html',
  styleUrls: ['./restaurant-add-review.component.scss']
})

export class RestaurantAddReviewComponent implements OnInit {
  @Input() index: Number;
  @Input() review: Review;
  @Input() showReviews: Boolean;
  @Input() showAddReview: Boolean;

  public selected: any;
  public authorName: string;
  public personnalReview: string;
  public personnalRating: number;
  public addNewReview: Review;

  constructor(public placeService: PlaceService,
    public restaurantComponent: RestaurantComponent) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.addNewReview = {
      author_name: this.authorName,
      profile_photo_url: '/assets/images/user-image.png',
      rating: this.personnalRating,
      relative_time_description: 'Aujourd\'hui',
      text: this.personnalReview
    };
    console.log('this.index.valueOf()', this.index.valueOf());
    this.placeService.restaurants[this.index.valueOf()].reviews.push(this.addNewReview);
    // Update restaurant Rating:
    const arrayRating: number[] = [];
    for (let i = 0; i < this.placeService.restaurants[this.index.valueOf()].reviews.length; i++) {
      arrayRating.push(this.placeService.restaurants[this.index.valueOf()].reviews[i].rating);
    }
    this.placeService.restaurants[this.index.valueOf()].rating =
      Math.ceil((arrayRating.reduce((a, b) => a + b, 0) / arrayRating.length) * 10) / 10;
    // Close form & open reviews:
    this.restaurantComponent.showReviews = true;
    this.restaurantComponent.showAddReview = false;
  }
}
