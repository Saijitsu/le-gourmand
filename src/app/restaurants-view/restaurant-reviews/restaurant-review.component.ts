import { Component, OnInit, Input } from '@angular/core';
import { RestaurantComponent } from '../restaurant/restaurant.component';

@Component({
  selector: 'app-restaurant-review',
  templateUrl: './restaurant-review.component.html',
  styleUrls: ['./restaurant-review.component.scss']
})

export class RestaurantReviewComponent implements OnInit {
  @Input() review: Review;
  constructor(public restaurantComponent: RestaurantComponent) {
   }
  ngOnInit() {
  }
}

export interface Review {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}
