import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-restaurant-add-review',
  templateUrl: './restaurant-add-review.component.html',
  styleUrls: ['./restaurant-add-review.component.scss']
})

export class RestaurantAddReviewComponent implements OnInit {
  public selectFormControl: any = new FormControl('', Validators.required); // Validate that the field is non-empty

  constructor() { }

  ngOnInit() {
  }

  /* onSubmit() {
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;

    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/games']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  } */
}
