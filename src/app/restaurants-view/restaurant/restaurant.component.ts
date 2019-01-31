import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { PlaceService } from './../../services/place.service';
import { RestaurantsListComponent } from '../restaurants-list/restaurants-list.component';
import { trigger, transition, animate, style, state } from '@angular/animations';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})

export class RestaurantComponent implements OnInit {

  @Input() restaurant: any;
  @Input() index: Number;
  @Input() showReviews: Boolean = false;
  @Input() showAddReview: Boolean = false;

  constructor(public restaurantsListComponent: RestaurantsListComponent,
    private _eref: ElementRef,
    public placeService: PlaceService) { }

  ngOnInit() {
  }
}
