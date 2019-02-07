import { Component, OnInit, NgZone} from '@angular/core';
import { PlaceService } from '../services/place.service';

declare let google: any;

@Component({
  selector: 'app-restaurants-view',
  templateUrl: './restaurants-view.component.html',
  styleUrls: ['./restaurants-view.component.scss']
})

export class RestaurantsViewComponent implements OnInit {

  public showSpinner: Boolean = true;
  constructor(public placeService: PlaceService,
    private ngZone: NgZone) {
      this.placeService.initCallback = () => {
        this.ngZone.run(() => this.showSpinner = false);
      };
  }

  ngOnInit() {
  }
}
