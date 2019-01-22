import { Review } from './../restaurant-reviews/restaurant-review.component';
import { PlaceService, Restaurant } from './../../services/place.service';
import { Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {
@Output()minValueOutput: EventEmitter<string> = new EventEmitter<string>();
@Output()maxValueOutput: EventEmitter<string> = new EventEmitter<string>();
public minValue = '0';
  public maxValue = '5';

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  // Array of restaurants
  public restaurants: Restaurant[] = this.placeService.restaurants;

  // Array of reviews
  public reviews: Review[];

  constructor(public placeService: PlaceService) {
  }

  ngOnInit() {
  }

  getRestaurantDetails(restaurantIndex: number) {
    this.placeService.getDetails(restaurantIndex);
  }

  minListValue() {
    this.minValueOutput.emit(this.minValue);
  }

  maxListValue() {
    this.maxValueOutput.emit(this.maxValue);
  }
}
