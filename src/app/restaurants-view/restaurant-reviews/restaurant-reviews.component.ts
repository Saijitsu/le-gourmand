import { PlaceService } from './../../services/place.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-reviews',
  templateUrl: './restaurant-reviews.component.html',
  styleUrls: ['./restaurant-reviews.component.scss']
})
export class RestaurantReviewsComponent implements OnInit {

  constructor(public places: PlaceService) { }

  ngOnInit() {
  }

}
