import { Component, OnInit, Input } from '@angular/core';
import { Restaurant } from './../../services/place.service';
import { RestaurantsListComponent } from '../restaurants-list/restaurants-list.component';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
public  showReviews = false;
public  showAddReview = false;

  @Input()restaurant: Restaurant[];

  constructor(public restaurantsListComponent: RestaurantsListComponent) { }

  ngOnInit() {
  }
}
