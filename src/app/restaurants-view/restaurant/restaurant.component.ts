import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Restaurant, PlaceService } from './../../services/place.service';
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
  @Input()index: Number;

  constructor(public restaurantsListComponent: RestaurantsListComponent, private _eref: ElementRef,
    public placeService: PlaceService) { }

  ngOnInit() {
  }
}

