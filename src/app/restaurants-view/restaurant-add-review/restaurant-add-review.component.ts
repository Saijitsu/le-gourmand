import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurant-add-review',
  templateUrl: './restaurant-add-review.component.html',
  styleUrls: ['./restaurant-add-review.component.scss']
})

export class RestaurantAddReviewComponent implements OnInit {
  public selectFormControl: any = new FormControl('', Validators.required); // Validate that the field is non-empty
  public myForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
  }
}
