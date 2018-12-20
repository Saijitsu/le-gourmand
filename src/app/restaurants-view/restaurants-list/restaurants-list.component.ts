import { PlaceService } from './../../services/place.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';



@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

 // Array of restaurants.
 restaurants: Restaurants[];

  constructor(public placeService: PlaceService) {

  }

  ngOnInit() {
    setTimeout(() => {
      this.restaurants = this.placeService.restaurants;
      console.log('affichage de la liste des restaurants après 300 millisecondes', this.restaurants);
    }, 300);
  }
}

interface Restaurants {
    id: number;
    name: string;
    vinanityAdress: string;
    latitude: string;
    longitude: string;
    rating: string;
    percentageRating: string;
    placeId: string;
    photo: any;
    openingHours: string;
}
