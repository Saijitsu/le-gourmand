import { Review } from '../app/restaurants-view/restaurant-reviews/restaurant-review.component';

// Create Restaurants Data
export class Restaurant {
  constructor(
    public id: number,
    public name: string,
    public vinanityAdress: string,
    public latitude: number,
    public longitude: number,
    public rating: string,
    public placeId: string,
    public photo: any,
    public reviews: Review[],
    public draggable: boolean = false,
    public animation: any = 'DROP') { }
}
