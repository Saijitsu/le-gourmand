import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-restaurant-reviews',
  templateUrl: './restaurant-reviews.component.html',
  styleUrls: ['./restaurant-reviews.component.scss']
})

export class RestaurantReviewsComponent implements OnInit {
  @Input() review: Reviews[];
  constructor() {
   }
  ngOnInit() {
  }
}

interface Reviews {
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}
