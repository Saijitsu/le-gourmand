import { NewRestaurantDialogComponent } from './../new-restaurant-dialog/new-restaurant-dialog.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-add-new-restaurant',
  templateUrl: './add-new-restaurant.component.html',
  styleUrls: ['./add-new-restaurant.component.scss']
})

export class AddNewRestaurantComponent {
 public dialogResult = '';
 public restaurantName: string;

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.restaurantName !== undefined ?
    this.restaurantName =  this.restaurantName
    :  this.restaurantName = '';

    const dialogRef = this.dialog.open(NewRestaurantDialogComponent, {
      width: '600px',
      data: this.restaurantName
    });

    dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
     // console.log('resto name:', this.restaurantName);
    });
  }

}


