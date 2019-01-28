import { Review } from './../restaurant-reviews/restaurant-review.component';
import { PlaceService } from './../../services/place.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import 'simplebar';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {
/*
  public minValue = this.placeService.minValue;
  public maxValue = this.placeService.maxValue; */

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

// Array of reviews
  public reviews: Review[];

  constructor(public placeService: PlaceService) {
  }

  ngOnInit() {
  }

  getRestaurantDetails(restaurantIndex: number) {
  this.placeService.getDetails(restaurantIndex);
  }
}
