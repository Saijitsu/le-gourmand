import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PlaceService } from 'src/app/services/place.service';

@Component({
  selector: 'app-new-restaurant-dialog',
  templateUrl: './new-restaurant-dialog.component.html',
  styleUrls: ['./new-restaurant-dialog.component.scss']
})
export class NewRestaurantDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<NewRestaurantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    public placeService: PlaceService) {
    }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.thisDialogRef.close('Restaurant Confirmé');
    this.data === '' ?
    this.placeService.restaurants.splice(this.placeService.restaurants.length - 1, 1)
    : this.placeService.restaurants[this.placeService.restaurants.length - 1].name = this.data;
  }

  onCloseCancel() {
    this.thisDialogRef.close('Création annulée');
    this.placeService.restaurants.splice(this.placeService.restaurants.length - 1, 1);
  }
}
