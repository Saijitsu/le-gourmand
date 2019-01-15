import {
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatDialogModule,
MatCardModule } from '@angular/material';
import { PlaceService } from './services/place.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MapViewComponent } from './restaurants-view/map-view/map-view.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { RestaurantsListComponent } from './restaurants-view/restaurants-list/restaurants-list.component';
import { RestaurantReviewComponent } from './restaurants-view/restaurant-reviews/restaurant-review.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { RestaurantsViewComponent } from './restaurants-view/restaurants-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { StarsComponent } from './stars/stars.component';
import { RestaurantComponent } from './restaurants-view/restaurant/restaurant.component';
import { RestaurantAddReviewComponent } from './restaurants-view/restaurant-add-review/restaurant-add-review.component';
import { AddNewRestaurantComponent } from './restaurants-view/add-new-restaurant/add-new-restaurant.component';
import { NewRestaurantDialogComponent } from './restaurants-view/new-restaurant-dialog/new-restaurant-dialog.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'restaurants-view', component: RestaurantsViewComponent },
  { path: '', redirectTo: 'restaurants-view', pathMatch: 'full' },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'restaurants-view' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapViewComponent,
    RestaurantsListComponent,
    RestaurantReviewComponent,
    FourOhFourComponent,
    SignupComponent,
    SigninComponent,
    RestaurantsViewComponent,
    StarsComponent,
    RestaurantComponent,
    RestaurantAddReviewComponent,
    AddNewRestaurantComponent,
    NewRestaurantDialogComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    ScrollingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCXoe_E_QM1YIjMO22IU28UCqX1HI7Uets',
      libraries: ['places']
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuardService, PlaceService, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent],
  entryComponents: [
    NewRestaurantDialogComponent
  ],
})
export class AppModule { }


