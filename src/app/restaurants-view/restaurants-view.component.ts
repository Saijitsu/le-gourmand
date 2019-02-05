import { Component, OnInit } from '@angular/core';
import { PlaceService } from '../services/place.service';

declare let google: any;

@Component({
  selector: 'app-restaurants-view',
  templateUrl: './restaurants-view.component.html',
  styleUrls: ['./restaurants-view.component.scss']
})

export class RestaurantsViewComponent implements OnInit {

  public showSpinner: Boolean = true;
  public showContent: Boolean = false;

  constructor(public placeService: PlaceService) {
  }

  ngOnInit() {
 setTimeout(() => {
      this.placeService.restaurants.length >= 1 ?
        this.viewContent()
        : setTimeout(() =>  {
          this.viewContent();
        }, 4000);
    }, 1000);
  }
  viewContent() {
    this.showSpinner = false;
    this.showContent = true;
  }
}
