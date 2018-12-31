import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-review',
  templateUrl: './restaurant-review.component.html',
  styleUrls: ['./restaurant-review.component.scss']
})

export class RestaurantReviewComponent implements OnInit {
  @Input() review: Review;
  constructor() {
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
