import { PlaceService } from './../../services/place.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {

  constructor(public places: PlaceService) { }

  ngOnInit() {
  }
}
