import { PlaceService } from './../../services/place.service';
import { Review } from './../restaurant-reviews/restaurant-review.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-add-review',
  templateUrl: './restaurant-add-review.component.html',
  styleUrls: ['./restaurant-add-review.component.scss']
})

export class RestaurantAddReviewComponent implements OnInit {
  @Input()index: Number;
  @Input() review: Review;

  public authorName: string;
  public personnalReview: string;
  public personnalRating: number;
  public addNewReview: Review;

  constructor(public placeService: PlaceService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.addNewReview = {
      author_name: this.authorName,
      profile_photo_url: '/assets/images/logo.png',
      rating: this.personnalRating,
      relative_time_description: 'Aujourd\'hui',
      text: this.personnalReview
    };
    console.log('submit result:', this.addNewReview);
    console.log('this.index:', this.index);
    console.log('this.placeService.restaurants[this.index]:', this.placeService.restaurants[this.index.valueOf()]);
    this.placeService.restaurants[this.index.valueOf()].reviews.push(this.addNewReview);
    console.log('this.placeService.restaurants[this.index.valueOf()].reviews:',
    this.placeService.restaurants[this.index.valueOf()].reviews);
  }
}
